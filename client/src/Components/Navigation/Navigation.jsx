import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import buildPath from "../../Utils/buildPath";

import "./Navigation.scss";

const Navigation = ({ item }) => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                {item.map((el, index) => {
                    const isArr = Array.isArray(buildPath(el));
                    return (
                        <NavigationItem
                            to={isArr && buildPath(el)[0]}
                            key={index}
                        >
                            {isArr ? buildPath(el)[1] : buildPath(el)}
                        </NavigationItem>
                    );
                })}
            </ul>
        </nav>
    );
};
export default React.memo(Navigation);
