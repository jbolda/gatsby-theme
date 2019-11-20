const Debug = require("debug");
const path = require("path");

exports.createPages = (
  { actions, store },
  { showArticlesOnHomepage = false }
) => {
  const { createPage, deletePage } = actions;
  const storeState = store.getState();
  const hasBlogInstalled = !!storeState.nodesByType.get(`BlogPost`);
  const showArticles = hasBlogInstalled && showArticlesOnHomepage;

  const homepageWithArticles = require.resolve(
    `./src/templates/homepageWithArticles.js`
  );
  const homepage = require.resolve(`./src/templates/homepage.js`);

  createPage({
    path: "/", // required
    component: showArticles ? homepageWithArticles : homepage
  });

  createPage({
    path: "/throwaway-page", // required
    component: showArticles ? homepage : homepageWithArticles
  });
  // creating then deleting it because that is the only way
  // to get gatsby to ignore a template
  deletePage({
    path: "/throwaway-page", // required
    component: showArticles ? homepage : homepageWithArticles
  });
};
