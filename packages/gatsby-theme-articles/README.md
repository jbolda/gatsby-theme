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

We also rely on peer dependencies of the following packages. Consult the package installation guides for each to potentially additional peer depedencies that require installation.

```
yarn add @jbolda/gatsby-theme-layout@^0.0.7 gatsby-plugin-mdx@^1.0.49 gatsby-plugin-sharp@^2.2.31 gatsby-plugin-theme-ui@^0.2.46 gatsby-source-filesystem@^2.1.0 gatsby-transformer-sharp@^2.2.20 theme-ui@^0.2.46
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
