import React, { useEffect, useState } from "react";
import Avatar from "../../../../assets/images/default.png";
import StaffMenu from "../../../c/StaffMenu";
import VerifyMenu from "../../../c/VerifyMenu";

const StaffItem = ({
  avatar,
  position,
  firstName,
  lastName,
  id,
  tips,
  areVerified,
}) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const handleMenuVisibility = (e) => {
    e.stopPropagation();
    setMenuVisibility(!isMenuVisible);
  };

  useEffect(() => {
    const body = document.querySelector("body");

    if (isMenuVisible) {
      body.addEventListener("click", handleMenuVisibility);
    } else {
      body.removeEventListener("click", handleMenuVisibility);
    }
  }, [isMenuVisible]);

  return (
    <li className="staff__item">
      <div className="staff__item__avatar">
        <img
          className="staff__item__avatar_img"
          src={avatar || Avatar}
          alt="avatar"
        />
      </div>

      <div className="staff__item__info">
        <div className="staff__item__info_employee">
          <p className="staff__item__info_employee_p">
            {position}, {firstName} {lastName}
          </p>

          <span className="staff__item__info_employee_span">Код: {id}</span>
        </div>

        <p className="staff__item__info_tips">Чаевые: {tips}₴</p>
      </div>

      <div className="staff__item__controllers">
        <button
          className="staff__item__controllers_btn"
          onClick={handleMenuVisibility}
        >
          <span className="staff__item__controllers_circle"></span>
          <span className="staff__item__controllers_circle"></span>
          <span className="staff__item__controllers_circle"></span>
        </button>
      </div>

      {isMenuVisible ? areVerified ? <StaffMenu /> : <VerifyMenu /> : null}
    </li>
  );
};

export default StaffItem;
