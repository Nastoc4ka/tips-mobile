import { TextField, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const Input = withStyles(() => ({
  root: {
    width: "100%",

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

const Error = ({ error }) => {
  return <p className="input__error">{error}</p>;
};

const InputWithError = ({ error, ...props }) => {
  return (
    <div className="input">
      <Input {...props} />
      <Error error={error} />
    </div>
  );
};

export { InputWithError, Input, Error };
