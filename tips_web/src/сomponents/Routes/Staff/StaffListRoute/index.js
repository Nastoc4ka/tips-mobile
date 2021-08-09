import React, { useState } from "react";
import { useSelector } from "react-redux";
import Controllers from "../Controllers";
import StaffList from "./StaffList";

const StaffListRoute = () => {
  const { staffVerified, staffNotVerified } = useSelector(
    (state) => state.adminReducer
  );
  const [areVerified, setVerified] = useState(true);
  const [filter, setFilter] = useState("");

  const changeTab = () => {
    setVerified(!areVerified);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Controllers
        length={staffNotVerified.length}
        areVerified={areVerified}
        changeTab={changeTab}
        filter={filter}
        handleChangeFilter={handleChangeFilter}
      />

      <div>
        <StaffList
          array={areVerified ? staffVerified : staffNotVerified}
          filter={areVerified ? filter : ""}
          areVerified={areVerified}
        />
      </div>
    </div>
  );
};

export default StaffListRoute;
