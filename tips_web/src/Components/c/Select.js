import React from "react";
import { Select, MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: "1.1rem",
    width: "70%",
    textTransform: "capitalize",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#FFA200",
    backgroundColor: "#FFA200",
    borderRadius: 5,
    color: "#fff",

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

    "& .MuiSelect-select": {
      textAlign: "center",

      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  },
});

const CustomSelect = ({ value, handleChange }) => {
  const classes = useStyles();
  return (
    <Select
      displayEmpty
      onChange={handleChange}
      value={value}
      className={classes.root}
    >
      <MenuItem value="">Все</MenuItem>
      <MenuItem value="официант">Официанты</MenuItem>
      <MenuItem value="бармен">Бармены</MenuItem>
    </Select>
  );
};

export default CustomSelect;
