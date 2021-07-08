import React from "react";

const VerifyMenu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <button className="menu__button">Подтвердить</button>
        </li>

        <li className="menu__item menu__item">
          <button className="menu__button_danger">Отклонить</button>
        </li>
      </ul>
    </div>
  );
};

export default VerifyMenu;
