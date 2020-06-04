import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  snackBar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomizedSnackBar = ({ openAlert, closeAlert }) => {
  const classes = useStyles();

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={() => closeAlert()}
      className={classes.snackBar}
    >
      <Alert severity="error">Votre nom d'organisation est incorrect !</Alert>
    </Snackbar>
  );
};

export default CustomizedSnackBar;
