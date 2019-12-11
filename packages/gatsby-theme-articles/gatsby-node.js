const Debug = require("debug");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName
  });
  return result;
};

exports.createSchemaCustomization = ({ actions, schema }, {}) => {
  const { createTypes } = actions;

  createTypes(`interface Articles @nodeInterface {
    id: ID!
    title: String!
    body: String!
    slug: String!
    written: Date! @dateformat
    updated: Date @dateformat
    tags: [String]
    keywords: [String]
    excerpt: String!
    featuredImage: ImageSharp
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxArticles`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`
        },
        slug: {
          type: `String!`
        },
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
        featuredImage: { type: "ImageSharp" }
      },
      interfaces: [`Node`, `Articles`]
    })
  );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  { contentPath = "articles", basePath = "" }
) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx` || !node.fileAbsolutePath) {
    return;
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === `Mdx` && source === contentPath) {
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
    // normalize use of trailing slash
    slug = slug.replace(/\/*$/, `/`);
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      written: node.frontmatter.written,
      keywords: node.frontmatter.keywords || []
    };

    const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`);
    await createNode({
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
    });
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) });
  }
};

exports.createPages = ({ graphql, actions, reporter }) => {
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

        createPage({
          path: "/articles/",
          component: require.resolve(`./src/templates/articleList`)
        });

        return;
      })
    );
  });
};
