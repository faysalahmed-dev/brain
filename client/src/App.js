import React from "react";
import { Switch, Route } from "react-router-dom";
import Particles from "./Components/Particles-js/Particles";
import AuthPage from "./Pages/Auth/AuthPage";
import HomePage from "./Pages/Home/HomePage";
import { AlertContextPovider } from "./Context/Alert.context";

function App() {
  return (
    <AlertContextPovider>
      <Particles>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </Particles>
    </AlertContextPovider>
  );
}

export default App;
