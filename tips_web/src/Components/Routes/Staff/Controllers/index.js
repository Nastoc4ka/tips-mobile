import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Select from "../../../c/Select";

const Controllers = ({
  changeTab,
  length,
  areVerified,
  filter,
  handleChangeFilter,
}) => {
  const { url } = useRouteMatch();

  return (
    <div className="staff__controllers">
      <button className="staff__controllers_btn" onClick={changeTab}>
        {areVerified ? `+${length} Заявки на реистрацию` : "Все сотрудники"}
      </button>

      <div className="staff__controllers_mid">
        <Link
          className="staff__controllers_btn staff__controllers_btn_mid"
          to={`${url}/add`}
        >
          + Добавить сотрудника
        </Link>

        {areVerified ? (
          <Select value={filter} handleChange={handleChangeFilter} />
        ) : (
          <p className="staff__controllers_subtitle">Заявки на регистрацию</p>
        )}
      </div>
    </div>
  );
};

export default Controllers;
