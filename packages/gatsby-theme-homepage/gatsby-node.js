const fs = require("fs");
const path = require("path");
const Debug = require("debug");

exports.createPages = async (
  { actions, getNodesByType, reporter },
  { showArticlesOnHomepage = false }
) => {
  const debug = Debug("@jbolda/gatsby-theme-homepage:createPages");

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

  await fs.mkdirSync(
    path.join(__dirname, "./.cache/@jbolda/gatsby-theme-homepage/templates/"),
    { recursive: true }
  );

  await fs.copyFileSync(
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

  const { createPage } = actions;

  const homepage = await require.resolve(
    `./.cache/@jbolda/gatsby-theme-homepage/templates/homepage.js`
  );

  if (debug.enabled && !!reporter) {
    reporter.info(
      `creating page from homepage template at \n${JSON.stringify(homepage)}`
    );
  }

  createPage({
    path: "/", // required
    component: homepage
  });
};
