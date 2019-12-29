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

## Convention
This plugin expects markdown files in a folder defined by a `gatsby-source-filesystem` config entry with a `name` entry of _articles_. The name can be configured with the `contentPath` option.

## Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: `@jbolda/gatsby-theme-articles`,
      options: { contentPath: "articles" }
    },
  ]
}
```

## Design Tokens
The following are design tokens that are applied by variants through this theme. You may use them to apply styles to elements as a stopgap before needing to shadow a component.

```js
{
  jboldaGatsbyTheme: {
    articles: {
      list: {
        container: { /* add tokens here */ },
        each: { /* add tokens here */ }
      },
      article: {
        container: { /* add tokens here */ },
        content: { /* add tokens here */ },
        footer: { /* add tokens here */ },
        featuredImage: { /* add tokens here */ }
      }
    }
  }
}
```
