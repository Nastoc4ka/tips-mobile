import React from "react";
import StaffItem from "./StaffItem";

const StaffList = ({ array, filter, areVerified }) => {
  const renderStaffItems = () => {
    return array.map((el) => {
      const { avatar, position, first_name, last_name, id, tips } = el;
      return position.includes(filter) ? (
        <StaffItem
          avatar={avatar}
          position={position}
          firstName={first_name}
          lastName={last_name}
          id={id}
          tips={tips}
          areVerified={areVerified}
        />
      ) : null;
    });
  };

  return <ul>{renderStaffItems()}</ul>;
};

export default StaffList;
