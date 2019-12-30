# `@jbolda/gatsby-theme-homepage`

## Convention
This plugin expects a `gatsby-source-filesystem` config entry with a `name` entry of _homepage_ pointing at the directory. The optional, but the recommended folder name is `src/homepage`.

It expects a `landing.mdx`, `about.mdx`, and picture file named `avatar` in this folder. These three files control the first two sections, and none are technically a requirement.

Lastly, it expects a nested folder named `engagements` with markdown files with names of your choosing. Each file will be a separate "engagement". We recommend the "largest" heading level that you use be `h3` which is `###`. In the markdown frontmatter, we expect an `order` with a number (integer) to sort these in a specified order being with `1`.

Additionally, the site links section in the about section (the second one), you may pass a list of contact links in the `siteMetadata`.  Use `contactLinks` as an array of objects with a `url`, `text` (the text you will see), and an `icon` as pulled from fontawesome.

## Configuration

```js
module.exports = {
  siteMetadata: {
    contactLinks: [
      {
        url: "mailto:me@jacobbolda.com",
        text: "me@jacobbolda.com",
        icon: ["far", "envelope"]
      },
      {
        url: "https://twitter.com/jacobbolda",
        text: "@jacobbolda",
        icon: ["fab", "twitter"]
      }
    ]
  },
  plugins: [
    {
      resolve: `@jbolda/gatsby-theme-homepage`,
      options: { showArticlesOnHomepage: true }
    },
  ]
}
```

## Design Tokens
The following are design tokens that are applied by variants through this theme. You may use them to apply styles to elements as a stopgap before needing to shadow a component.

```js
{
  jboldaGatsbyTheme: {
    homepage: {
      landing: {
        container: { /* add tokens here */ },
        left: { /* add tokens here */ },
        right: { /* add tokens here */ }
      },
      about: {
        container: { /* add tokens here */ },
        left: { /* add tokens here */ },
        right: { /* add tokens here */ },
        heading: { /* add tokens here */ },
        text: { /* add tokens here */ },
        link: { /* add tokens here */ }
      },
      engagements: {
        container: { /* add tokens here */ },
        each: { /* add tokens here */ },
        heading: { /* add tokens here */ },
        text: { /* add tokens here */ },
        link: { /* add tokens here */ }
      },
      articles: {
        container: { /* add tokens here */ },
        each: { /* add tokens here */ },
        heading: { /* add tokens here */ },
        text: { /* add tokens here */ },
        link: { /* add tokens here */ }
      }
    }
  }
}
```
