import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Dialog,
  IconButton,
} from "@material-ui/core";
import Button from "../../../../../c/Button";
import { Back } from "../../../../../../assets/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#00a03e",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddAvatarWrapper = ({
  children,
  title,
  btn,
  isOpen,
  handleClose,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose(false)}
            aria-label="close"
          >
            <Back />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div className="editPhoto__btn">
            <Button
              handleClick={handleClose}
              type="fill"
              name="avatar"
              disabled={disabled}
            >
              {btn}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

export default AddAvatarWrapper;
