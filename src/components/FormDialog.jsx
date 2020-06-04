import React, { useState, Fragment, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  icon:{
    color: "white"
  },
  iconButton:{
    backgroundColor: theme.palette.primary.main +  "!important"
  }
}));

const FormDialog = ({ addNewOrg }) => {
  const classes = useStyles();

  const [isOpen, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const toggleDialog = useCallback(() => {
    !isOpen && setInputText("");
    setOpen(!isOpen);
  },[setOpen, isOpen, setInputText]);

  const handleTextFieldChange = useCallback((e) => {
    setInputText(e.target.value);
  },[setInputText]);

  const handleCreateNewOrg = useCallback(async () => {
    await addNewOrg(inputText);
    toggleDialog();
  },[inputText, addNewOrg, toggleDialog]);

  return (
    <Fragment>
        <Fab className={classes.iconButton} aria-label="add" onClick={toggleDialog}>
          <AddIcon className={classes.icon}/>
        </Fab>
      <Dialog
        open={isOpen}
        onClose={toggleDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Ajouter une organisation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entrez le nom de l'organisation que vous souhaiter ajouter.
          </DialogContentText>
          <TextField
            defaultValue={inputText}
            className="standard-basic"
            onChange={(e) => handleTextFieldChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleCreateNewOrg} color="secondary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default FormDialog;
