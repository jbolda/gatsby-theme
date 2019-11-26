const Debug = require("debug");
const path = require("path");
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
    tags: [String]!
    keywords: [String]!
    excerpt: String!
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
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
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
        }
      },
      interfaces: [`Node`, `Articles`]
    })
  );
};

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions;
  const { contentPath, basePath } = themeOptions;

  // Make sure it's an MDX node
  if (
    node.internal.type !== `Mdx` ||
    !node.parent ||
    (!!node.parent && node.parent.sourceInstanceName !== "articles")
  ) {
    return;
  }
  console.log(node);
  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  let slug = "";
  if (node.internal.type === `Mdx` && source === contentPath) {
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
      console.log({
        node: fileNode,
        getNode,
        basePath: contentPath
      });
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
      date: node.frontmatter.date,
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
        type: `MdxArticle`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldData))
          .digest(`hex`),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the BlogPost interface`
      }
    });
    createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const mdxArticle = require.resolve(`./src/templates/articleTemplate.js`);
    // const mdxBlogPostWithoutImage = require.resolve(
    //   `./src/templates/articleTemplateWithoutImage.js`
    // );

    resolve(
      graphql(
        `
          {
            allArticles {
              nodes {
                slug
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          console.log(result);
          reject(result.errors);
        }

        result.data.allArticles.nodes.forEach(node => {
          if (node.path) {
            createPage({
              path: node.slug, // required
              // component: edge.node.fields.heroImageSet
              //   ? mdxBlogPost
              //   : mdxBlogPostWithoutImage,
              component: mdxArticle,
              context: {
                slug: node.slug
              }
            });
          }
        });

        createPage({
          path: "/articles/",
          component: require.resolve(`./src/templates/articleList.js`)
        });

        return;
      })
    );
  });
};
