import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "../../../../assets/images/default.png";
import { deleteUserSaga, updateUserSaga } from "../../../../redux/actions";
import StaffMenu from "../../../elements/StaffMenu";
import VerifyMenu from "../../../elements/VerifyMenu";

const StaffItem = ({ employeeData, areVerified }) => {
  const [anchorElement, setAnchorelement] = useState(null);
  const { avatar, position, firstName, lastName, id, tips } = employeeData;
  const dispatch = useDispatch();

  const verifyEmployee = () => {
    dispatch(updateUserSaga({ ...employeeData, verified: true }));
  };

  const deleteEmployee = () => {
    dispatch(deleteUserSaga(employeeData));
  };

  const handleOpen = (event) => {
    setAnchorelement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorelement(null);
  };

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
        <button className="staff__item__controllers_btn" onClick={handleOpen}>
          <span className="staff__item__controllers_circle"></span>
          <span className="staff__item__controllers_circle"></span>
          <span className="staff__item__controllers_circle"></span>
        </button>
      </div>
      {areVerified ? (
        <StaffMenu
          anchor={anchorElement}
          deleteEmployee={deleteEmployee}
          handleClose={handleClose}
          open={!!anchorElement}
        />
      ) : (
        <VerifyMenu
          deleteEmployee={deleteEmployee}
          anchor={anchorElement}
          verifyEmployee={verifyEmployee}
          handleClose={handleClose}
          open={!!anchorElement}
        />
      )}
    </li>
  );
};

export default StaffItem;
