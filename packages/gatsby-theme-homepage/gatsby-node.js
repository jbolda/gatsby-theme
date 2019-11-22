const fs = require("fs");
const path = require("path");
const Debug = require("debug");

exports.onPreBootstrap = ({ store }, { showArticlesOnHomepage = false }) => {
  const storeState = store.getState();
  const hasBlogInstalled = !!storeState.nodesByType.get(`BlogPost`);
  const showArticles = hasBlogInstalled && showArticlesOnHomepage;

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
