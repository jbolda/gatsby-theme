import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ siteMetadata }) => (
  <aside className="menu">
    <p className="menu-label">Contact Me</p>
    <ul className="menu-list">
      {siteMetadata.contactLinks.map(link => (
        <li key={link.text}>
          <a href={link.url}>
            <FontAwesomeIcon icon={link.icon} /> {link.text}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);
