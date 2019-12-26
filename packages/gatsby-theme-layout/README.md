# `@jbolda/gatsby-theme-layout`

## Convention
This theme is primarily used in other themes. There is only configuration requirements.

## Configuration
```js
module.exports = {
  siteMetadata: {
    siteTitle: `Jacob Bolda`,
    siteDescription: `Structural Engineer with a knack for creative solutions using code and ingenuity.`,
    siteAuthor: `Jacob Bolda`,
    siteContact: "https://twitter.com/jacobbolda",
    navLinks: [
      { url: "/articles/", text: "Articles" },
      { url: "/recipes/", text: "Our Recipes" }
    ]
  }
}
```

## Design Tokens
```js
{
  jboldaGatsbyTheme: {
    layout: {
      header: { // add tokens here },
      content: { // add tokens here },
      footer: { // add tokens here }
    }
  }
}
```
