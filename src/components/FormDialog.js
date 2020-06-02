import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [textadd, addingText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(textadd)
    props.handletextchange(textadd,'add')
    setOpen(false);

  };

  const handleCloseCancel = () => {
    setOpen(false);
  }
  ;
  const _handleTextFieldChange = (e) => {
    console.log(e.target.value)
    addingText(e.target.value);
  };

  return (
    <div>
      <Button id="addbutton" color="primary" onClick={handleClickOpen}>
        <Fab color="primary" aria-label="add">
                <AddIcon />
        </Fab>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une organisation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entrez le nom de l'organisation que vous souhaiter ajouter.
          </DialogContentText>
          <div id="add-org">
          <TextField defaultValue={textadd}  className="standard-basic" onChange={(e)=>{_handleTextFieldChange(e)}} id="add-org-text" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
