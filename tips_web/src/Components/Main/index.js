import React from "react";
import { Route, Switch } from "react-router-dom";
import OrganizationsList from "./ChoosingOrganizations";
import LogIn from "../Authorization/LogIn";
import MainScreen from "../Wrappers/MainScreen";

const Main = () => {
  return (
    <Switch>
      <Route path="/organizations" component={OrganizationsList} />
      <Route path="/login" component={LogIn} />
      <Route path="/id=:id" component={MainScreen} />
    </Switch>
  );
};

export default Main;

// import React from "react";
// import { Switch, Route } from "react-router-dom";

// const Main = ({ match }) => {
//   console.log(match);
//   return (
//     <Switch>
//     </Switch>
//   );
// };

// export default Main;
