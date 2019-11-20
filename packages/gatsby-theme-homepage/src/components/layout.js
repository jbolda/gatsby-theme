import React from "react";
import Landing from "./landing";
import About from "./about";

const Layout = props => (
  <SimpleNav location={props.location}>
    <Landing swatch="primary" />
    <About swatch="secondary" />
    {props.children}
  </SimpleNav>
);

export default Layout;

const SimpleNav = ({ children }) => <div>{children}</div>;
