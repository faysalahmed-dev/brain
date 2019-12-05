import React from "react";
import SmartBrain from "../../Containers/SmartBrian/SmartBrian";
import Particles from "../../Components/Particles-js/Particles";
import Navigation from "../../Components/Navigation/Navigation";
import Logo from "../../Components/Logo/Logo";
import "./Home.scss";

const HomePage = () => {
  return (
    <div className="home">
      <Particles className="home_particles" />
      <header>
        <Navigation />
        <Logo />
      </header>
      <main>
        <div className="container home__main">
          <SmartBrain />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
