import React from "react";
import TulletFields from "./TulletFields";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    margin: "30px 10px",
  },
  expanded: {
    margin: "30px 10px !important",
    "& > :last-child": {
        marginBottom: 10,
        marginLeft:5
      },
      "& > :first-child": {
        marginTop: 10
      }
    
  },
}));


const Panel = ({ org, data, removeExistingOrg, saveData, handleChange }) => {
    const classes = useStyles();
  return (
    <ExpansionPanel classes={{expanded:classes.expanded, root: classes.root}}>
      <ExpansionPanelSummary

        expandIcon={<ExpandMoreIcon color="primary"/>}
        aria-label="Expand"
        aria-controls="panel1a-content"
      >
        {org}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TulletFields data={data} org={org} handleChange={handleChange} />
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size="small" onClick={() => removeExistingOrg(org)} color="primary">
          Supprimer
        </Button>
        <Button size="small" onClick={() => saveData(data)} color="secondary">
          Enregistrer
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};

export default Panel;
