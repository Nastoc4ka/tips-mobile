import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import OrganizationsList from "./ChoosingOrganizations";
import MainScreen from "../Wrappers/MainScreen";
import { getOrganizationsSaga } from "../../redux/actions";
import Authorization from "../Authorization";

const Main = () => {
  const user = useSelector((state) => state.authLoginReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) dispatch(getOrganizationsSaga(user.id));
    else history.push("/login");
  }, [user, dispatch]);

  return (
    <Switch>
      <Route path="/organizations" component={OrganizationsList} />
      <Route path="/login" component={Authorization} />
      <Route path="/id=:id" component={MainScreen} />
    </Switch>
  );
};

export default Main;
