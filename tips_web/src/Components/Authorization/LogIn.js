import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loginSaga } from "../../redux/actions";
import Form from "./Form";
import DoubleScreen from "../Wrappers/DoubleScreen";

const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authLoginReducer.user);

  const login = (data) => {
    dispatch(loginSaga(data));
    history.push("/organizations");
  };

  useEffect(() => {
    if (user) history.goBack();
  }, [user, history]);

  return (
    <DoubleScreen>
      <Typography variant="h1" component="h1" gutterBottom>
        Привет
      </Typography>

      <Form handleLogin={login} />
    </DoubleScreen>
  );
};

export default LogIn;
