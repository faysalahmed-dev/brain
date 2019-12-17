import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import "./Navigation.scss";

function buildPath(str) {
  //console.log(str);
  if (!str.includes("/")) return str.trim();
  const toPath = str.match(/\/.*/);
  return [toPath[0], toPath.input.split("/")[0].trim()];
}
const Navigation = ({ item }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {item.map((el, index) => {
          const isArr = Array.isArray(buildPath(el));
          return (
            <NavigationItem to={isArr && buildPath(el)[0]} key={index}>
              {isArr ? buildPath(el)[1] : buildPath(el)}
            </NavigationItem>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navigation;
