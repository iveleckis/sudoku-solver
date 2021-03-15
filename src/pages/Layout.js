import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import SudokuCreateForm from "./SudokuCreateForm";

const Layout = () => {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/create">
          <SudokuCreateForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default Layout;
