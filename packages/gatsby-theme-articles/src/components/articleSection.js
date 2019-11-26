import React from "react";

const ArticleSection = ({ props, adjustTitleStyle, adjustPostStyle }) => {
  if (props.componentOverride) {
    return props.componentOverride();
  } else if (props.componentBlocks) {
    return (
      <section
        className={`section is-${props.swatch || "secondary"}`}
        style={{ paddingBottom: "1rem", ...adjustPostStyle }}
      >
        <ColumnContainer>
          <h1
            className="title is-1"
            style={{
              paddingLeft: 24,
              paddingRight: 40,
              ...adjustTitleStyle
            }}
          >
            {props.post.frontmatter.title}
          </h1>
        </ColumnContainer>
        {props.componentBlocks.map(block => {
          if (block.wrapper === "break-out") {
            return (
              <div key={block.uniqueKey} className="container">
                {block.renderComponent()}
              </div>
            );
          } else {
            return (
              <ColumnContainer key={block.uniqueKey}>
                {block.renderComponent()}
              </ColumnContainer>
            );
          }
        })}
        <ColumnContainer>
          <div className={`notification is-${props.swatch || "primary"}`}></div>
        </ColumnContainer>
      </section>
    );
  } else {
    return (
      <section
        className={`section is-${props.swatch || "fifthary"}`}
        style={{ paddingBottom: "1rem", ...adjustPostStyle }}
      >
        <div className="container">
          <ColumnContainer>
            <h1
              className="title is-1"
              style={{
                paddingLeft: 24,
                paddingRight: 40,
                ...adjustTitleStyle
              }}
            >
              {props.post.frontmatter.title}
            </h1>
            <div className={`notification is-${props.swatch || "secondary"}`}>
              {props.children}
            </div>
          </ColumnContainer>
        </div>
      </section>
    );
  }
};

const ColumnContainer = ({ children }) => (
  <div className="columns is-centered">
    <div className="column is-half">{children}</div>
  </div>
);

export default ArticleSection;
