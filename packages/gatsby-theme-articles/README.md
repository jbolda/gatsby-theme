# `gatsby-theme-blog`

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
