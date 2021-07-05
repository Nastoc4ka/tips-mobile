import { TextField, withStyles } from "@material-ui/core";

const Input = withStyles(() => ({
  root: {
    "& label.Mui-focused": {
      color: "rgba(36, 168, 172, 0.6)",
    },
    "& label.MuiInputLabel-outlined": {
      color: "rgba(36, 168, 172, 0.6)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(36, 168, 172, 0.6)",
    },
    "& .MuiOutlinedInput-root": {
      color: "rgb(36, 168, 172)",
      marginBottom: "1rem",
      "& fieldset": {
        borderColor: "rgba(36, 168, 172, 0.6)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(36, 168, 172, 0.6)",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 1,
        borderColor: "rgba(36, 168, 172, 0.6)",
      },
    },
  },
}))(TextField);

export default Input;
