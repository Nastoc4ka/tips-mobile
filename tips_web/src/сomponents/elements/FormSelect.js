import { Select, MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    border: "1px solid rgba(36, 168, 172, 0.6)",
    borderRadius: 4,
    color: "rgb(36, 168, 172)",

    "& .MuiInputBase-input": {
      paddingTop: 9.4,
      paddingBottom: 9.4,
      paddingLeft: 14,
    },

    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },

    "&.MuiInput-underline": {
      "&:before": {
        borderWidth: 0,
      },

      "&:hover:not(.Mui-disabled):before": {
        borderWidth: 0,
      },

      "&:after": {
        borderWidth: 0,
      },
    },

    "& .MuiSelect-icon": {
      color: "rgba(36, 168, 172, 0.6)",
    },
  },
});

const FormSelect = ({ value, handleChange, error }) => {
  const classes = useStyles();

  return (
    <div className="input">
      <Select
        displayEmpty
        onChange={handleChange}
        value={value}
        name="position"
        className={classes.root}
      >
        <MenuItem value="">Позиция</MenuItem>
        <MenuItem value="официант">Официант</MenuItem>
        <MenuItem value="бармен">Бармен</MenuItem>
        <MenuItem value="администратор">Администратор</MenuItem>
      </Select>
      <p className="input__error">{error}</p>
    </div>
  );
};

export default FormSelect;
