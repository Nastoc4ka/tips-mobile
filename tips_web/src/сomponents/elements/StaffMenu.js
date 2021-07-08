import React from "react";

const StaffMenu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        <li className="menu__item">Настройки</li>
        <li className="menu__item menu__item_danger">Удалить сотрудника</li>
      </ul>
    </div>
  );
};

export default StaffMenu;
