import React from "react";
import { Logo } from "../../assets/icons";

const DoubleScreen = ({ children }) => {
  return (
    <div className="login">
      <div className="block block__logo">
        <div className="block__logo_wrapper">
          <Logo />
        </div>
      </div>
      <div className="block">{children}</div>
    </div>
  );
};

export default DoubleScreen;
