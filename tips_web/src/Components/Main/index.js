import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import OrganizationsList from "./ChoosingOrganizations";
import LogIn from "../Authorization/LogIn";
import MainScreen from "../Wrappers/MainScreen";
import { getOrganizationsSaga } from "../../redux/actions";

const Main = () => {
  const user = useSelector((state) => state.authLoginReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(getOrganizationsSaga(user.id));
  }, [user, dispatch]);

  return (
    <Switch>
      <Route path="/organizations" component={OrganizationsList} />
      <Route path="/login" component={LogIn} />
      <Route path="/id=:id" component={MainScreen} />
    </Switch>
  );
};

export default Main;
