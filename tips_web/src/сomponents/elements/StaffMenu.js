import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const StaffMenu = ({ deleteEmployee, handleClose, open, anchor }) => {
  return (
    <Menu
      keepMounted
      open={open}
      onClose={handleClose}
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
      }}
    >
      <MenuItem onClick={handleClose}>Настройки</MenuItem>
      <MenuItem className="menu__button_danger" onClick={deleteEmployee}>
        Удалить сотрудника
      </MenuItem>
    </Menu>
  );
};

export default StaffMenu;
