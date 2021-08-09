import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
    width: "100%",
    textTransform: "capitalize",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#FFA200",

    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
      fontSize: "2rem",
      lineHeight: 1.2,
    },

    "&.Mui-disabled": {
      color: "#0087CB",
    }
  },

  fill: {
    backgroundColor: "#FFA200",
    color: "#fff",

    "&:hover": {
      borderWidth: 2,
      
      color: "#0087CB",
      backgroundColor: "#fff",
    },
  },

  outline: {
    backgroundColor: "#fff",
    color: "#0087CB",
  },
});

export default function CustomButton({type = "fill", children, disabled = false, handleClick}) {
  const classes = useStyles();
  return <Button disabled={disabled} className={`${classes.root} ${classes.[type]}`} onClick={handleClick}>{children}</Button>
};
