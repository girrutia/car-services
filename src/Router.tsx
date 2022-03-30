import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import OwnersPage from "./components/Owners";
import VehiclesPage from "./components/Vehicles";

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
        <Redirect from="/" to="/vehicles" />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
