import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fieldsWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "10px",
    "& > div": {
      marginBottom: "20px",
    },
  },
}));

const FieldsWrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.fieldsWrapper}>{children}</div>;
};

const CustomTextField = withStyles((theme) => ({
  root: {
    '& .MuiInputBase-input': {
      color: 'rgba(22, 22, 22, 0.8)'
    },
    '& .MuiInputBase-input:focus': {
      color:"rgba(22, 22, 22, 1)"
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.palette.secondary.main, 
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);

const TulletFields = ({ handleChange, org, data }) => {
  return (
    <FieldsWrapper>
      <CustomTextField
        name="compteurMax"
        className="standard-basic-field"
        label="Compteur maximal"
        onChange={(e) => handleChange(e, org)}
        type="number"
        defaultValue={data[org].compteurMax}
      />
      <CustomTextField
        name="compteurTotal"
        className="standard-basic-field"
        label="Compteur actuel"
        onChange={(e) => handleChange(e, org)}
        type="number"
        defaultValue={data[org].compteurTotal}
      />
      <CustomTextField
        name="domain"
        variant="outlined"
        rows="4"
        multiline
        className="standard-basic-multi"
        label="Nom de domaine autorisé"
        onChange={(e) => handleChange(e, org)}
        defaultValue={data[org].domain}
      />
      <CustomTextField
        name="admins"
        variant="outlined"
        rows="4"
        multiline
        className="standard-basic-multi"
        label="Admins"
        onChange={(e) => handleChange(e, org)}
        defaultValue={data[org].admins}
      />
    </FieldsWrapper>
  );
};

export default TulletFields;
