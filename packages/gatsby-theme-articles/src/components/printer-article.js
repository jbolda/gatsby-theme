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

      background: "#000000",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",
      zIndex: 99
    }}
  >
    {children}
  </div>
);

export default ({ title }) => {
  return (
    <div
      style={{
        background: "#1b1f2a",
        padding: "1rem",
        width: "800px",
        height: "400px"
      }}
    >
      <Border>
        <div>{title}</div>
      </Border>
    </div>
  );
};
