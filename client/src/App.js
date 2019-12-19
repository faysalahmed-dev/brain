import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Particles from "./Components/Particles-js/Particles";

import AuthPage from "./Pages/Auth/AuthPage";
import HomePage from "./Pages/Home/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Logout from "./Containers/Logout/Logout";

import { AlertContextPovider } from "./Context/Alert.context";
import { UserProvider } from "./Context/User.context";
import { userContext } from "./Context/User.context";

function App() {
  const { data, token } = useContext(userContext);
  return (
    <UserProvider>
      <AlertContextPovider>
        <Particles>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            {data && token ? (
              <Route path="/logout" component={Logout} />
            ) : (
              <Redirect to="/" />
            )}
            <Route component={PageNotFound} />
          </Switch>
        </Particles>
      </AlertContextPovider>
    </UserProvider>
  );
}

export default App;
