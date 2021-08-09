import React, { useEffect, useState } from "react";
import Form from "./Form";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserFail } from "../../../../redux/actions";
// import AvatarImagePath from "../../../../assets/images/default.png";

const AddEmployee = () => {
  const organizationId = useSelector(
    (state) => state.adminReducer.chosenOrganization
  );
  const isUserAdded = useSelector((state) => state.systemReducer.isUserAdded);

  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
    password: Math.random().toString(36).slice(-8),
    avatar: null,
    organizationId,
  };

  const history = useHistory();
  const [employeeData, setEmployeeData] = useState(initialState);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setEmployeeData((prev) => ({ ...prev, organizationId }));
  }, [organizationId]);

  useEffect(() => {
    if (isUserAdded) {
      setEmployeeData({
        ...initialState,
      });
      dispatch(addUserFail());
    }
  }, [isUserAdded]);

  return (
    <div>
      <div className="staff__controllers">
        <button className="staff__controllers_btn" onClick={goBack}>
          Назад
        </button>
        <h3 className="staff__controllers_title">Добавить сотрудника</h3>
      </div>
      <div className="addEmployee__form_wrapper">
        <Form data={employeeData} setData={setEmployeeData} />
      </div>
    </div>
  );
};

export default AddEmployee;
