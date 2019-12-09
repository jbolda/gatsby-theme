const fs = require("fs");
const path = require("path");
const Debug = require("debug");

exports.resolvableExtensions = async (
  { getNodesByType, reporter },
  { showArticlesOnHomepage = false }
) => {
  const debug = Debug("@jbolda/gatsby-theme-homepage:resolvableExtensions");
  // it seems that we can't query for interfaces
  // so only supporting MdxArticles right now
  const hasArticlesInstalled = getNodesByType(`MdxArticles`).length > 0;
  const showArticles = hasArticlesInstalled && showArticlesOnHomepage;

  if (debug.enabled && !!reporter) {
    reporter.info(`Is the article theme installed? ${hasArticlesInstalled}`);
    reporter.info(
      `Is the theme configured to show articles? ${showArticlesOnHomepage}`
    );
  }

  fs.mkdirSync(
    path.join(__dirname, "./.cache/@jbolda/gatsby-theme-homepage/templates/"),
    { recursive: true }
  );

  return await fs.copyFileSync(
    require.resolve(
      `./src/templates/${
        showArticles ? "homepageWithArticles.nojs" : "homepage.js"
      }`
    ),
    path.join(
      __dirname,
      "./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js"
    )
  );
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const homepage = require.resolve(
    `./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js`
  );

  createPage({
    path: "/", // required
    component: homepage
  });
};
