import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DoubleScreen from "../Wrappers/DoubleScreen";
import SignIn from "./SignIn";

const Authorization = () => {
  const history = useHistory();
  const user = useSelector((state) => state.authLoginReducer.user);

  useEffect(() => {
    if (user) history.push("/organizations");
  }, [user]);

  return (
    <DoubleScreen>
      <SignIn />
    </DoubleScreen>
  );
};

export default Authorization;
