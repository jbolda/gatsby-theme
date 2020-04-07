# `@jbolda/gatsby-theme-articles`

## Installation

Install from npm or yarn:

```
npm install @jbolda/gatsby-theme-articles
```

or

```
yarn add @jbolda/gatsby-theme-articles
```

We also rely on peer dependencies of the following packages. Consult the package installation guides for each to potentially additional peer dependencies that require installation.

```
yarn add @jbolda/gatsby-theme-layout@^0.0.7 gatsby-plugin-mdx@^1.0.49 gatsby-plugin-sharp@^2.2.31 gatsby-plugin-theme-ui@^0.3.0 gatsby-source-filesystem@^2.1.0 gatsby-transformer-sharp@^2.2.20 theme-ui@^0.2.46
```

## Convention

This plugin expects markdown files in a folder defined by a `gatsby-source-filesystem` config entry with a `name` entry of _articles_. The name can be configured with the `contentPath` option. The `contentPath` is in an array of objects named `contents`. With this configuration as an array, we can enable you to add multiple folders to "watch". This may be valuable if you have notes or drafts that should be treated separate from the main articles. You may also specify a `basePath` which will be prepended to your url slug, e.g. when `basePath: "article"` then your url might be `example.com/article/my-first-post`.

If you would like to use your own header, you can shadow the `Nav` and you don't need to include `@jbolda/gatsby-theme-layout`. To shadow the `Nav` component, place a `nav.js` with a `Nav` component exported as a default in your directory at `src/@jbolda/gatsby-theme-layout/components`. See the `nav-shadow` in the examples folder.

## Configuration

### Example Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: `@jbolda/gatsby-theme-articles`,
      options: { contents: [{ contentPath: "articles" }] }
    }
  ]
};
```

### Example Configuration With Articles, Drafts In Subfolder, and Social Images

```js
module.exports = {
  plugins: [
    {
      resolve: `@jbolda/gatsby-theme-articles`,
      options: {
        contents: [
          {
            contentPath: "articles",
            socialImages: "https://og-image.example.com/?title=${title}"
          },
          {
            contentPath: "drafts",
            basePath: "draft",
            socialImageComponent: require.resolve(
              "./src/articles/social-image.js"
            )
          }
        ]
      }
    }
  ]
};
```

## Social Images

We support a handful of methods to get social images built into your site. This is the image that "unfurls" when posted on social media. We have an "order of importance" applied that you can mix and match even within a single `contentPath`.

- The `socialImage` frontmatter in an article with either a full or partial url (we add the site domain for you if you have a partial url)
- If you are using a `featureImage` placed in the frontmatter, we will use that.
- In the config with a specific "content", specify a `socialImages` that will be applied to every piece of content. It is piped through `lodash`'s `template` function and we supply the frontmatter object to it. Note that we expect a string, but you will can use the template literal `${title}` syntax to have it dynamically filled in.
- If you have `gatsby-plugin-printer` installed and listed in your `gatsby-config.js`, we will create the image for you. You cannot shadow the template used, but you can specify a `socialImageComponent` with `require.resolve()` within the content group.
- If none of these options produce a social image, we will just not include that `meta` tag.

## Design Tokens

The following are design tokens that are applied by variants through this theme. You may use them to apply styles to elements as a stopgap before needing to shadow a component.

```js
{
  jboldaGatsbyTheme: {
    articles: {
      list: {
        container: { /* add tokens here */ },
        each: { /* add tokens here */ },
        heading: { /* add tokens here */ },
        text: { /* add tokens here */ },
        link: { /* add tokens here */ }
      },
      article: {
        container: { /* add tokens here */ },
        content: { /* add tokens here */ },
        footer: { /* add tokens here */ },
        featuredImage: { /* add tokens here */ },
        heading: { /* add tokens here */ },
        text: { /* add tokens here */ },
        link: { /* add tokens here */ },
        components: { /*
          add components here as shown in mdx docs,
          we pass this to the provider */
        }
      }
    }
  }
}
```
