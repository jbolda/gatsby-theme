const Debug = require("debug");
const fs = require("fs");
const path = require("path");
const util = require("util");
const crypto = require("crypto");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

exports.createSchemaCustomization = ({ actions, schema, reporter }, {}) => {
  const debug = Debug(
    "@jbolda/gatsby-theme-articles:createSchemaCustomization"
  );
  const { createTypes } = actions;

  createTypes(`interface Articles @nodeInterface {
    id: ID!
    title: String!
    body: String!
    slug: String!
    contentPath: String!
    written: Date! @dateformat
    updated: Date @dateformat
    tags: [String]
    keywords: [String]
    excerpt: String!
    featuredImage: ImageSharp
  }`);

  if (debug.enabled && !!reporter) {
    reporter.info(`@jbolda/gatsby-theme-articles:createSchemaCustomization`);
  }

  const mdxResolverPassthrough = fieldName => async (
    source,
    args,
    context,
    info
  ) => {
    const debug = Debug(
      "@jbolda/gatsby-theme-articles:createSchemaCustomization:mdxResolverPassthrough"
    );
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent
    });
    if (debug.enabled && !!reporter) {
      reporter.info(
        `@jbolda/gatsby-theme-articles:createSchemaCustomization:mdxResolverPassthrough mdxNode\n${util.inspect(
          mdxNode
        )}`
      );
    }
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, {
      fieldName
    });
    if (debug.enabled && !!reporter) {
      reporter.info(
        `@jbolda/gatsby-theme-articles:createSchemaCustomization:mdxResolverPassthrough result\n${util.inspect(
          result
        )}`
      );
    }
    return result;
  };

  const imageSharpResolverPassthrough = fieldName => async (
    source,
    args,
    context,
    info
  ) => {
    const debug = Debug(
      "@jbolda/gatsby-theme-articles:createSchemaCustomization:imageSharpResolverPassthrough"
    );

    if (debug.enabled && !!reporter) {
      reporter.info(
        `@jbolda/gatsby-theme-articles:createSchemaCustomization:imageSharpResolverPassthrough source\n${util.inspect(
          source,
          { showHidden: true }
        )}`
      );
    }

    // early return based on set string, if undefined/null then we can exit
    // and properly set as null for graphql
    if (!source[fieldName]) return null;

    const type = info.schema.getType(`Mdx`);
    try {
      await context.nodeModel.prepareNodes(
        type, // source node
        {
          frontmatter: {
            featuredImage: { childImageSharp: { id: true } }
          }
        }, // querying for resolvable field
        {
          frontmatter: {
            featuredImage: { childImageSharp: { id: true } }
          }
        }, // resolve this field
        [type.name] // The types to use are these
      );
    } catch (e) {
      reporter.warn(
        `We tried to resolve an image on ${source.title},
        but an ImageSharp node does not exist. This may be intentional and 
        an image is not required.`
      );
      reporter.error(e);
      return null;
    }

    try {
      const mdxNode = await context.nodeModel.runQuery({
        type: type,
        query: { filter: { id: { eq: source.parent } } },
        firstOnly: true
      });

      if (debug.enabled && !!reporter) {
        reporter.info(
          `@jbolda/gatsby-theme-articles:createSchemaCustomization:imageSharpResolverPassthrough mdxNode\n${util.inspect(
            mdxNode,
            { showHidden: true }
          )}`
        );
      }

      const imageSharpNode = await context.nodeModel.getNodeById({
        id:
          mdxNode.__gatsby_resolved.frontmatter.featuredImage.childImageSharp.id
      });

      if (debug.enabled && !!reporter) {
        reporter.info(
          `@jbolda/gatsby-theme-articles:createSchemaCustomization:imageSharpResolverPassthrough imageSharpNode\n${util.inspect(
            imageSharpNode
          )}`
        );
      }

      return imageSharpNode;
    } catch (e) {
      // we catch and ignore as an image isn't required
      if (debug.enabled && !!reporter) {
        reporter.warn(
          `We queried for the image node on ${source.title},
          but an ImageSharp node does not exist. This may be intentional and 
          an image is not required.`
        );
        reporter.error(e);
      }
      return null;
    }
  };

  createTypes(
    schema.buildObjectType({
      name: `MdxArticles`,
      fields: {
        id: { type: `ID!` },
        title: { type: `String!` },
        slug: { type: `String!` },
        contentPath: { type: `String!` },
        written: { type: `Date!`, extensions: { dateformat: {} } },
        updated: { type: `Date`, extensions: { dateformat: {} } },
        tags: { type: `[String]` },
        keywords: { type: `[String]` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        featuredImage: {
          type: "ImageSharp",
          resolve: imageSharpResolverPassthrough(`featuredImage`)
        }
      },
      interfaces: [`Node`, `Articles`]
    })
  );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, reporter },
  { contents = [] }
) => {
  const debug = Debug("@jbolda/gatsby-theme-articles:onCreateNode");
  const { createNode, createParentChildLink } = actions;

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx` || !node.fileAbsolutePath) {
    return;
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === `Mdx`) {
    const articleNodes = await Promise.all(
      contents.map(async ({ contentPath = "articles", basePath = "" }) => {
        if (source === contentPath) {
          let slug;
          if (node.frontmatter.slug) {
            if (path.isAbsolute(node.frontmatter.slug)) {
              // absolute paths take precedence
              slug = node.frontmatter.slug;
            } else {
              // otherwise a relative slug gets turned into a sub path
              slug = urlResolve(basePath, node.frontmatter.slug);
            }
          } else {
            // otherwise use the filepath function from gatsby-source-filesystem
            const filePath = createFilePath({
              node: fileNode,
              getNode,
              basePath: contentPath
            });
            slug = urlResolve(basePath, filePath);
          }

          try {
            const { createPrinterNode } = require(`gatsby-plugin-printer`);

            await createPrinterNode({
              id: createNodeId(`${node.id} >>> ArticlePrinterNode`),
              fileName: slug,
              outputDir: "article-images",
              data: node,
              component: require.resolve("./src/components/printer-article.js")
            });
          } catch (e) {
            // no-op if not installed or error
            console.warn(e);
          }

          // normalize use of trailing slash
          slug = slug.replace(/\/*$/, `/`);
          const fieldData = {
            title: node.frontmatter.title,
            tags: node.frontmatter.tags || [],
            slug,
            written: node.frontmatter.written,
            keywords: node.frontmatter.keywords || [],
            // set string as an easy check for early return
            featuredImage: node.frontmatter.featuredImage,
            contentPath: contentPath
          };

          if (debug.enabled && !!reporter) {
            reporter.info(`@jbolda/gatsby-theme-articles:onCreateNode`);
            reporter.info(
              `incoming frontmatter:\n${util.inspect(node.frontmatter)}`
            );
            reporter.info(`proxy node data:\n${util.inspect(fieldData)}`);
          }

          const mdxBlogPostId = createNodeId(`${node.id} >>> MdxArticle`);

          return {
            ...fieldData,
            // Required fields.
            id: mdxBlogPostId,
            parent: node.id,
            children: [],
            internal: {
              type: `MdxArticles`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(fieldData))
                .digest(`hex`),
              content: JSON.stringify(fieldData),
              description: `Mdx implementation of the Articles interface`
            }
          };
        } else {
          return null;
        }
      })
    );

    const createNodes = articleNodes.map(async articleNode =>
      !articleNode ? false : createNode(articleNode)
    );

    const createParentLinks = articleNodes.map(async articleNode =>
      !articleNode
        ? false
        : createParentChildLink({
            parent: articleNode,
            child: getNode(articleNode.id)
          })
    );

    return Promise.all([].concat(createNodes, createParentLinks));
  }
};

exports.createPages = ({ graphql, actions, reporter }, { contents = [] }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allArticles {
              nodes {
                slug
                featuredImage {
                  id
                }
              }
            }
          }
        `
      ).then(async result => {
        if (result.errors) {
          console.log(result.errors);
          console.log(result);
          reject(result.errors);
        }
        const debug = Debug("@jbolda/gatsby-theme-articles:createPages");

        let articlesWithoutImages = 0;
        let mdxArticleWithImage;
        let articlesWithImages = 0;
        let mdxArticleWithoutImage;
        result.data.allArticles.nodes.forEach(node => {
          if (node.featuredImage && node.featuredImage.id) {
            articlesWithImages++;
          } else {
            articlesWithoutImages++;
          }
        });

        if (debug.enabled && !!reporter) {
          reporter.info(`articles with images: ${articlesWithImages}`);
          reporter.info(`articles without images: ${articlesWithoutImages}`);
        }

        try {
          await fs.rmdirSync(
            "./.cache/@jbolda/gatsby-theme-articles/templates/"
          );
        } catch (e) {
          if (debug.enabled && !!reporter) {
            reporter.error(`error removing .cache dir\n`, e);
          }
        }

        await fs.mkdirSync(
          path.join(
            __dirname,
            "./.cache/@jbolda/gatsby-theme-articles/templates/"
          ),
          { recursive: true }
        );

        if (articlesWithImages > 0) {
          await fs.copyFileSync(
            require.resolve(`./src/templates/articleTemplate.nojs`),
            path.join(
              __dirname,
              "./.cache/@jbolda/gatsby-theme-articles/templates/articleTemplate.js"
            )
          );
          mdxArticleWithImage = require.resolve(
            `./.cache/@jbolda/gatsby-theme-articles/templates/articleTemplate.js`
          );
        }

        if (articlesWithoutImages > 0) {
          await fs.copyFileSync(
            require.resolve(`./src/templates/articleTemplateWithoutImage.nojs`),
            path.join(
              __dirname,
              `./.cache/@jbolda/gatsby-theme-articles/templates/articleTemplateWithoutImage.js`
            )
          );
          mdxArticleWithoutImage = require.resolve(
            `./.cache/@jbolda/gatsby-theme-articles/templates/articleTemplateWithoutImage.js`
          );
        }

        result.data.allArticles.nodes.forEach(node => {
          if (node.slug) {
            createPage({
              path: node.slug, // required
              component:
                node.featuredImage && node.featuredImage.id
                  ? mdxArticleWithImage
                  : mdxArticleWithoutImage,
              context: {
                slug: node.slug
              }
            });
          }
        });

        contents.forEach(content =>
          createPage({
            path: !content.listPath
              ? `/${content.contentPath}/`
              : `/${content.listPath}/`,
            component: require.resolve(`./src/templates/articleList`),
            context: { contentPath: content.contentPath }
          })
        );

        return;
      })
    );
  });
};
