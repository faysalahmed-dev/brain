import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import NavigationItem from "./NavigationItem/NavigationItem";
import buildPath from "../../Utils/buildPath";

import { userContext } from "../../Context/User.context";

import "./Navigation.scss";

const Navigation = ({ item, history }) => {
    const {
        user: { data, token },
        removeUserData,
    } = useContext(userContext);
    const handleLogout = () => {
        removeUserData();
        history.replace("/");
    };

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
                <li className="navigation__item">
                    {data && token ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : null}
                </li>
            </ul>
        </nav>
    );
};
export default React.memo(withRouter(Navigation));
