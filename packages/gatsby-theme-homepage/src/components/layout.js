import React from "react";
import Nav from "@jbolda/gatsby-theme-layout";
import Landing from "./landing";
import About from "./about";
import Engagements from "./engagements";

const Layout = props => (
  <Nav location={props.location}>
    <Landing />
    <About />
    <Engagements />
    {props.children}
  </Nav>
);

export default Layout;
