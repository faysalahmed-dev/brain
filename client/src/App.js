import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { AlertContextPovider } from "./Context/Alert.context";
import { UserProvider } from "./Context/User.context";

import Particles from "./Components/Particles-js/Particles";
import PageLoader from "./Components/UI/PageLoader/PageLoader";

import HomePage from "./Pages/Home/HomePage";

const AuthPage = lazy(() => import("./Pages/Auth/AuthPage"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));

function App() {
    return (
        <UserProvider>
            <AlertContextPovider>
                <Particles>
                    <Suspense fallback={<PageLoader />}>
                        <Switch>
                            <Route path="/auth" component={AuthPage} />
                            <Route path="/profile" exact component={Profile} />
                            <Route path="/" exact component={HomePage} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Suspense>
                </Particles>
            </AlertContextPovider>
        </UserProvider>
    );
}

export default App;
