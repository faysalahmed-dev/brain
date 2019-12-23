import React, { useContext } from "react";
import SmartBrain from "../../Containers/SmartBrian/SmartBrian";
import "./Home.scss";
import { AlertContext } from "../../Context/Alert.context";
import { SmartBrainContextProvider } from "../../Context/SmartBrian.context";
import AlertBox from "../../Components/UI/AlertMessage/Alert";
import Layout from "../../Components/UI/Layout/Layout";

const HomePage = () => {
    const {
        alert: { isShowAlert, message },
    } = useContext(AlertContext);

    return (
        <Layout navItem={["Profile/profile"]}>
            <main>
                {isShowAlert && <AlertBox>{message}</AlertBox>}
                <div className="container home__main">
                    <SmartBrainContextProvider>
                        <SmartBrain />
                    </SmartBrainContextProvider>
                </div>
            </main>
        </Layout>
    );
};

export default HomePage;
