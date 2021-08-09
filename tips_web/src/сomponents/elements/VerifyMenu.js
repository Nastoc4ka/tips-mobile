import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const VerifyMenu = ({
  deleteEmployee,
  verifyEmployee,
  handleClose,
  open,
  anchor,
}) => {
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
      <MenuItem onClick={verifyEmployee}>Подтвердить</MenuItem>
      <MenuItem className="menu__button_danger" onClick={deleteEmployee}>
        Отклонить
      </MenuItem>
    </Menu>
  );
};

export default VerifyMenu;
