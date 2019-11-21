const fs = require("fs");
const path = require("path");
const Debug = require("debug");

exports.onPreExtractQueries = (
  { actions, store },
  { showArticlesOnHomepage = false }
) => {
  const storeState = store.getState();
  const hasBlogInstalled = !!storeState.nodesByType.get(`BlogPost`);
  const showArticles = hasBlogInstalled && showArticlesOnHomepage;

  if (showArticles) {
    fs.mkdir(
      path.resolve("./.cache/@jbolda/gatsby-theme-homepage/templates"),
      { recursive: true },
      err => {
        if (err) throw err;

        fs.copyFileSync(
          require.resolve("./src/templates/homepageWithArticles.js"),
          path.resolve(
            "./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js"
          )
        );
      }
    );
    fs.mkdir(
      path.resolve("./.cache/@jbolda/gatsby-theme-homepage/components"),
      { recursive: true },
      err => {
        if (err) throw err;

        fs.copyFileSync(
          require.resolve("./src/components/articles.nojs"),
          path.resolve(
            "./.cache/@jbolda/gatsby-theme-homepage/components/articles.js"
          )
        );
      }
    );
  } else {
    fs.mkdir(
      path.resolve("./.cache/@jbolda/gatsby-theme-homepage/templates"),
      { recursive: true },
      err => {
        if (err) throw err;

        fs.copyFileSync(
          require.resolve("./src/templates/homepage.js"),
          path.resolve(
            "./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js"
          )
        );
      }
    );
  }
  return;
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const homepage = path.resolve(
    `./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js`
  );

  createPage({
    path: "/", // required
    component: homepage
    // component: showArticles ? homepageWithArticles : homepage
  });
};
