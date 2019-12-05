import React from 'react'
import Particles from 'react-particles-js';


const particles = (props) => {
     return (
          <Particles className={props.className}
               params={{
                    "particles": {
                         "number": {
                              "value": 150
                         },
                         "size": {
                              "value": 3
                         }
                    },
                    "interactivity": {
                         "events": {
                              "onhover": {
                                   "enable": true,
                                   "mode": "repulse"
                              }
                         }
                    }
               }} />
     )
}
export default particles;