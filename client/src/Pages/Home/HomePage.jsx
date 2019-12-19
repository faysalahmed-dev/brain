import React, { useContext } from "react";
import SmartBrain from "../../Containers/SmartBrian/SmartBrian";
import Header from "../../Components/Header/Header";
import "./Home.scss";
import { userContext } from "../../Context/User.context";
import { AlertContext } from "../../Context/Alert.context";
import { SmartBrainContextProvider } from "../../Context/SmartBrian.context";
import AlertBox from "../../Components/UI/AlertMessage/Alert";

const HomePage = () => {
  const {
    user: { data, token },
  } = useContext(userContext);
  const {
    alert: { isShowAlert, message },
  } = useContext(AlertContext);
  const withOutUser = [
    "Home/",
    "Sing in/auth/singin",
    "Register/auth/register",
  ];
  const withUser = ["profile", "logout"];
  return (
    <div className="home">
      {isShowAlert && <AlertBox>{message}</AlertBox>}
      <Header item={data && token ? withUser : withOutUser} />
      <main>
        <div className="container home__main">
          <SmartBrainContextProvider>
            <SmartBrain />
          </SmartBrainContextProvider>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
