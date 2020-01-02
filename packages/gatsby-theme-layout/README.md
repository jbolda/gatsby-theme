# `@jbolda/gatsby-theme-layout`

## Installation
Install from npm or yarn:
```
npm install @jbolda/gatsby-theme-layout
```
or
```
yarn add @jbolda/gatsby-theme-layout
```

We also rely on peer dependencies of the following packages. Consult the package installation guides for each to potentially additional peer depedencies that require installation.

```
yarn add gatsby-plugin-mdx@^1.0.49 gatsby-plugin-sharp@^2.2.31 gatsby-plugin-theme-ui@^0.2.46 gatsby-source-filesystem@^2.1.0 gatsby-transformer-sharp@^2.2.20 theme-ui@^0.2.46
```

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
The following are design tokens that are applied by variants through this theme. You may use them to apply styles to elements as a stopgap before needing to shadow a component.

```js
{
  jboldaGatsbyTheme: {
    layout: {
      header: { /* add tokens here */ },
      content: { /* add tokens here */ },
      footer: { /* add tokens here */ },
      heading: { /* add tokens here */ },
      text: { /* add tokens here */ },
      link: { /* add tokens here */ }
    }
  }
}
```
