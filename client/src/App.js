import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./Pages/Auth/AuthPage";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/auth" exact component={AuthPage} />
      </Switch>
    </>
  );
}

export default App;
