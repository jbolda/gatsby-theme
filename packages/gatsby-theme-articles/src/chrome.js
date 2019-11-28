import React from "react";
import ArticleLayout from "./articleLayout";
import HelmetBlock from "./components/helmetBlock";
import ArticleSection from "./components/articleSection";
import Img from "gatsby-image";

class Chrome extends React.Component {
  render() {
    const adjustTitleStyle = this.props.hero
      ? {
          color: "white",
          textShadow: [
            "1px 1px 0 #000",
            "-1px -1px 0 #000",
            "1px -1px 0 #000",
            "-1px 1px 0 #000",
            "1px 1px 0 #000"
          ]
        }
      : {};
    const adjustPostStyle = this.props.hero ? { marginTop: "-20%" } : {};

    const HeroImage = props => {
      if (props.hero) {
        return (
          <section className="hero is-medium">
            <div className="container-fluid">
              <Img className="image" fluid={props.hero.childImageSharp.fluid} />
            </div>
          </section>
        );
      } else {
        return null;
      }
    };

    return (
      <ArticleLayout location={this.props.location}>
        <HeroImage hero={this.props.hero} />
        <ArticleSection
          props={this.props}
          adjustTitleStyle={adjustTitleStyle}
          adjustPostStyle={adjustPostStyle}
          swatch="secondary"
        />
        <HelmetBlock frontmatter={this.props.article} />
      </ArticleLayout>
    );
  }
}

export default Chrome;
