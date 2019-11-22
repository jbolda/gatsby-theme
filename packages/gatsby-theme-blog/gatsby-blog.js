const Debug = require("debug");
const path = require("path");

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode } = actions;
  const fileNode = getNode(node.parent);

  let slug;
  if (node.internal.type === `MarkdownRemark`) {
    try {
      const parsedFilePath = path.parse(fileNode.relativePath);

      if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
      } else if (parsedFilePath.dir === ``) {
        slug = `/${parsedFilePath.name}/`;
      } else {
        slug = `/${parsedFilePath.dir}/`;
      }

      // Add slug as a field on the node.
      createNodeField({ node, name: `slug`, value: slug });
      createNodeField({
        node,
        name: `sourceInstanceName`,
        value: fileNode.sourceInstanceName
      });
      createNodeField({
        node,
        name: `heroImageSet`,
        value: !!node.frontmatter.heroImage
      });
    } catch (error) {
      // nil
      console.log(error);
    }
  }

  if (
    (node.internal.type === `MarkdownRemark` ||
      node.internal.type === `JavascriptFrontmatter`) &&
    (fileNode.sourceInstanceName === `blog` ||
      fileNode.sourceInstanceName === `articles`)
  ) {
    const nodeData = {
      title: node.frontmatter.title,
      written: node.frontmatter.written,
      updated: node.frontmatter.updated,
      last: node.frontmatter.updated || node.frontmatter.written,
      path: node.frontmatter.path,
      category: node.frontmatter.category,
      description: node.frontmatter.description,
      heroImage: node.frontmatter.heroImage
    };

    const blogNode = {
      id: createNodeId(`${node.id} >>> BlogPost`),
      children: [],
      parent: node.id,
      frontmatter: nodeData,
      internal: {
        contentDigest: JSON.stringify(nodeData),
        type: `BlogPost`
      }
    };

    const prefixedUnderscore = path
      .parse(node.fileAbsolutePath)
      .name.startsWith("_");
    if (!prefixedUnderscore) {
      createNode(blogNode);
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const mdBlogPost = require.resolve(`./src/templates/blogPostTemplate.js`);
    const mdBlogPostWithoutImage = require.resolve(
      `./src/templates/blogPostTemplateWithoutImage.js`
    );

    resolve(
      graphql(
        `
          {
            allMdx(
              filter: { fields: { sourceInstanceName: { eq: "articles" } } }
            ) {
              nodes {
                frontmatter {
                  path
                }
                fields {
                  slug
                  heroImageSet
                }
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

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.path) {
            createPage({
              path: edge.node.frontmatter.path, // required
              component: edge.node.fields.heroImageSet
                ? mdBlogPost
                : mdBlogPostWithoutImage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          }
        });

        createPage({
          path: "/articles/",
          component: require.resolve(`./src/templates/blogPostList.js`)
        });

        return;
      })
    );
  });
};
