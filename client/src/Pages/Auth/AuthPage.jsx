import React from "react";
import Auth from "../../Containers/Auth/Auth";
import Particles from "../../Components/Particles-js/Particles";
import Logo from "../../Components/Logo/Logo";

import "./AuthPage.scss";

const authPage = props => {
  return (
    <div className="home">
      <Particles className="home_particles" />
      <header>
        <Logo />
      </header>
      <main className="auth_page">
        <div className="container home__main">
          <Auth />
        </div>
      </main>
    </div>
  );
};
export default authPage;
