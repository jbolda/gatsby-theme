const fs = require("fs");
const path = require("path");
const Debug = require("debug");

exports.onPreExtractQueries = (
  { getNodesByType, reporter },
  { showArticlesOnHomepage = false }
) => {
  const debug = Debug("@jbolda/gatsby-theme-homepage:onPreExtractQueries");
  // it seems that we can't query for interfaces
  // so only supporting MdxArticles right now
  const hasArticlesInstalled = getNodesByType(`MdxArticles`).length > 0;
  const showArticles = hasArticlesInstalled && showArticlesOnHomepage;

  debug(
    reporter.info(`Is the article theme installed? ${hasArticlesInstalled}`)
  );
  debug(
    reporter.info(
      `Is the theme configured to show articles? ${showArticlesOnHomepage}`
    )
  );

  if (showArticles) {
    fs.mkdirSync(
      path.join(__dirname, "./.cache/@jbolda/gatsby-theme-homepage/templates/"),
      { recursive: true }
    );

    fs.copyFileSync(
      require.resolve("./src/templates/homepageWithArticles.js"),
      path.join(
        __dirname,
        "./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js"
      )
    );

    fs.mkdirSync(
      path.join(
        __dirname,
        "./.cache/@jbolda/gatsby-theme-homepage/components/"
      ),
      { recursive: true }
    );

    fs.copyFileSync(
      require.resolve("./src/components/articles.nojs"),
      path.join(
        __dirname,
        "./.cache/@jbolda/gatsby-theme-homepage/components/articles.js"
      )
    );
  } else {
    fs.mkdirSync(
      path.join(__dirname, "./.cache/@jbolda/gatsby-theme-homepage/templates/"),
      { recursive: true }
    );

    fs.copyFileSync(
      require.resolve("./src/templates/homepage.js"),
      path.join(
        __dirname,
        "./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js"
      )
    );
  }
  return;
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
