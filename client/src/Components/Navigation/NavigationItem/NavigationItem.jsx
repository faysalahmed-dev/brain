import React from "react";
import { Link } from "react-router-dom";
import "./NavigationItem.scss";

const navigationItem = ({ to, children }) => (
  <li className="navigation__item">
    <Link
      className="navigation__item-link"
      to={
        to ||
        children
          .toLowerCase()
          .split(" ")
          .join("")
          .trim()
      }
    >
      {children}
    </Link>
  </li>
);
export default navigationItem;
