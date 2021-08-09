import React from "react";
import StaffItem from "./StaffItem";

const StaffList = ({ array, filter, areVerified }) => {
  const renderStaffItems = () => {
    return array.map((el) => {
      return el.position.includes(filter) ? (
        <StaffItem employeeData={el} areVerified={areVerified} key={el.id} />
      ) : null;
    });
  };

  return <ul>{renderStaffItems()}</ul>;
};

export default StaffList;
