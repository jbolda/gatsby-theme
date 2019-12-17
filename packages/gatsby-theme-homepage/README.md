# `@jbolda/gatsby-theme-homepage`

## Convention
This plugin expects a `gatsby-source-filesystem` config entry with a `name` entry of _homepage_ pointing at directory. The optional, but recommended folder name is `src/homepage`.

It expects a `landing.mdx`, `about.mdx`, and picture file named `avatar` in this folder. These three files control the first two sections, and none are technically a requirement.

Lastly, it expects a nested folder named `engagements` with markdown files with names of your choosing. Each file will be a separate "engagement".

## Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: `@jbolda/gatsby-theme-homepage`,
      options: { showArticlesOnHomepage: true }
    },
  ]
}
```
