import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { getStaffSaga } from "../../../redux/actions";
import AddEmployee from "./AddEmployee";
import StaffListRoute from "./StaffListRoute";

const Staff = () => {
  const organizationId = useSelector(
    (state) => state.adminReducer.chosenOrganization
  );
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getStaffSaga(organizationId));
  }, [organizationId]);

  return (
    <div>
      <Route exact path={`${url}`} component={StaffListRoute} />
      <Route path={`${url}/add`} component={AddEmployee} />
    </div>
  );
};

export default Staff;
