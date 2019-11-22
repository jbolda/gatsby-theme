import React, { useState } from "react";
import { Link } from "gatsby";

const TopNav = props => {
  const [hamburgerActive, toggleHamburgerMenu] = useState(false);

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link
          to="/"
          className="navbar-item"
          style={
            props.location.pathname === "/"
              ? { backgroundColor: "colors.P5" }
              : {}
          }
        >
          <span
            className="title"
            style={
              props.location.pathname === "/"
                ? { color: "colors.P2" }
                : { color: "colors.P5" }
            }
          >
            {props.logo ? (
              <Logo
                icon={
                  !!props.logo.inverse && props.location.pathname !== "/"
                    ? props.logo.inverse
                    : props.logo.data
                }
                alt={props.logo.alt}
              />
            ) : (
              props.siteMetadata.siteTitle
            )}
          </span>
        </Link>
        {!props.siteMetadata.navLinks ? null : (
          <button
            className={
              hamburgerActive ? "navbar-burger is-active" : "navbar-burger"
            }
            aria-label="menu"
            aria-expanded={hamburgerActive ? "true" : "false"}
            style={{ color: "colors.P5" }}
            onClick={toggleHamburgerMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            {hamburgerActive ? "true" : "false"}
          </button>
        )}
      </div>
      {!props.siteMetadata.navLinks ? null : props.siteMetadata.navLinks[0]
          .text === "" ? null : (
        <div
          className={hamburgerActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-end">
            {props.siteMetadata.navLinks.map(link => (
              <Link
                key={link.text}
                to={link.url}
                className="navbar-item"
                style={
                  props.location.pathname === link.url
                    ? {
                        backgroundColor: "colors.P5",
                        color: "colors.P2"
                      }
                    : {}
                }
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;

const Logo = ({ icon, alt }) => (
  <img
    src={icon}
    alt={alt}
    style={{
      height: `50px`,
      maxHeight: `50px`,
      marginBottom: `0px`
    }}
  />
);
