import React from "react";

const Border = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      position: "relative",
      padding: "1px",
      boxSizing: "border-box",
      background: "#e9edf6",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "2rem",
      zIndex: 99
    }}
  >
    {children}
  </div>
);

export default ({ frontmatter: { title } }) => {
  return (
    <div
      style={{
        background: "#39f1a2",
        padding: "1rem",
        width: "800px",
        height: "400px"
      }}
    >
      <Border>
        <div
          style={{
            color: "black",
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
