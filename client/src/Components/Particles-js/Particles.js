import React from "react";
import Particles from "react-particles-js";

import styles from "./Particles.module.scss";

const particles = props => {
  return (
    <>
      <Particles
        className={styles.particle}
        params={{
          particles: {
            number: {
              value: 150,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: false,
                mode: "repulse",
              },
            },
          },
        }}
      />
      {props.children}
    </>
  );
};
export default particles;
