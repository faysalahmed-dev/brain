import React from "react";
import SmartBrain from "../../Containers/SmartBrian/SmartBrian";
import Header from "../../Components/Header/Header";
import "./Home.scss";

const HomePage = () => {
  return (
    <div className="home">
      <Header
        item={["Home/", "Sing in/auth/singin", "Register/auth/register"]}
      />
      <main>
        <div className="container home__main">
          <SmartBrain />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
