# gatsby-theme
### M O N O R E P O for Gatsby themes

## The Concept
These themes were written with the intent to allow a user to gradually settle into their Gatsby site. The current ecosystem seems to rely too heavily on shadowing and uses it as a crutch. Shadowing is a powerful and important feature, but the theme creator should provide a more gradual experience that eventually leads to shadowing if necessary.

## Methodology
These themes seek to accomplish our concept by using convention then configuration then shadowing if necessary. The convention is represented by the built-in data sources that it expects to consume, and the structure and location of the content. As the user wants to address more advanced configurations, they can use the Gatsby lifecycles to bring in data and put it into the existing data model. This would allow the user to make the content their own without the need to rely on any shadowing.

## Customizing Styles and Layouts
The other item that a user may want to modify is the styling and layout of the pages. A theme generally makes a basic assumption about the method of applying styles, be it css, Sass, css-in-js or what have you. For example, if they want to use Sass, but the library uses a css-in-js solution, the user will likely not pick this theme. Assuming that the user is okay with the method of styling that the theme uses, the real crux is changing the structure of the page. The only way they can modify the structures of pages is by shadowing components. This set of themes explores the middle ground.

These themes use theme-ui which has some built-in ability to customize colors, fonts and potentially some structural changes depending on how the theme creator builds the page. That can only get the user so far though. It also makes full use of the createPages lifecycles and template features. We can enable a gradual step into shadowing by providing multiple templates that can be used and composed based on convention, configuration, context and/or a combination of all three. From here we can move forward from a theme approach that is more than single-minded.

# Packages
| package | description |
| ------- | ----------- |
| [@jbolda/gatsby-theme-homepage](https://github.com/jbolda/gatsby-theme/tree/master/packages/gatsby-theme-homepage) | Theme to construct a homepage. |
| [@jbolda/gatsby-theme-articles](https://github.com/jbolda/gatsby-theme/tree/master/packages/gatsby-theme-articles) | Theme to construct pages for each of your articles. |
| [@jbolda/gatsby-theme-layout](https://github.com/jbolda/gatsby-theme/tree/master/packages/gatsby-theme-layout) | Theme generally ingested by other themes to set navigation and default SEO. |

# Example sites
- [Personal](https://jbolda-gatsby-theme-personal.netlify.com/) ([Source](https://github.com/jbolda/gatsby-theme/tree/master/examples/personal))
