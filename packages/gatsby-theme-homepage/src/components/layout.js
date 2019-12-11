import React from "react";
import Nav from "@jbolda/gatsby-theme-layout";
import Landing from "./landing";
import About from "./about";
import ProfessionalEngagements from "./professionalEngagements";

const Layout = props => (
  <Nav location={props.location}>
    <Landing />
    <About />
    <ProfessionalEngagements />
    {props.children}
  </Nav>
);

export default Layout;
