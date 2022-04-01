import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import OwnersPage from "./components/Owners";
import VehiclesPage from "./components/Vehicles";
import ServicesPage from "./components/Services";

const Router: React.FC = () => {
  const history = useHistory();
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/owners">
          <OwnersPage />
        </Route>
        <Route path="/vehicles">
          <VehiclesPage />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Redirect from="/" to="/vehicles" />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
