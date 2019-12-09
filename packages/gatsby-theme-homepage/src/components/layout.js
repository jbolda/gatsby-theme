import React from "react";
import Landing from "./landing";
import About from "./about";
import Nav from "@jbolda/gatsby-theme-layout";

const Layout = props => (
  <Nav location={props.location}>
    <Landing />
    <About />
    {props.children}
  </Nav>
);

export default Layout;
