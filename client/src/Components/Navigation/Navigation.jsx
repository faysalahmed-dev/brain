import React from 'react'
import NavItem from './NavigationItem/NavigationItem'

import './Navigation.scss'
const Navigation = () => {
     return (
          <nav className="navigation">
               <ul className="navigation__list">
                    <NavItem>Sing Out</NavItem>
               </ul>
          </nav>
     )
}
export default Navigation;