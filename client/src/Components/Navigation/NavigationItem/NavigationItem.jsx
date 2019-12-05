import React from 'react'
import "./NavigationItem.scss";

const navigationItem = props => (
     <li className="navigation__item">
          <a href="/" className="navigation__item-link">{props.children}</a>
     </li>
)
export default navigationItem;