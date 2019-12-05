import React from 'react';
import Tilty from "react-tilty";
import logoBrain from '../../Assets/logo.png'
import './Logo.scss'

const logo = () => {
     return (
          <div className="logo">
               <Tilty className="logo__container" settings={{
                    glare: true,
                    scale: 1.05,
                    "max-glare": 0.5
               }}>
                    <img src={logoBrain} alt="logo"/>
               </Tilty>
               {/* <a target="_blank" href="https://icons8.com/icons/set/brain">Cute Color</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
          </div>
     )
}
export default logo;