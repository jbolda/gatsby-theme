import React from "react";

const Border = ({ children, backgroundColor }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      position: "relative",
      padding: "1px",
      boxSizing: "border-box",
      background: backgroundColor,
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "2rem",
      zIndex: 99
    }}
  >
    {children}
  </div>
);

export default ({
  frontmatter: { title },
  backgroundColor = "#e9edf6",
  borderColor = "#39f1a2",
  textColor = "black"
}) => {
  return (
    <div
      style={{
        background: borderColor,
        padding: "1rem",
        width: "800px",
        height: "400px"
      }}
    >
      <Border backgroundColor={backgroundColor}>
        <div
          style={{
            color: textColor,
            textAlign: "center",
            width: "400px",
            fontSize: "3rem"
          }}
        >
          {title}
        </div>
      </Border>
    </div>
  );
};
