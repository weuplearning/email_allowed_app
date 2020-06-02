import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import '../App.css';

class Tullets extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
        return (
        <div className={'tulletWrapper'}>
          <div className="field">
             <TextField className="standard-basic-field" label="Compteur maximal"  onChange={(e)=>{this.props.onChangeContent(e,this.props.title,'compteurMax')}} type="number" defaultValue={this.props.content[this.props.title].compteurMax} />
             <TextField className="standard-basic-field" label="Compteur actuel"  onChange={(e)=>{this.props.onChangeContent(e,this.props.title,'compteurTotal')}} type="number" defaultValue={this.props.content[this.props.title].compteurTotal} />
          </div>
          <div className="field">
             <TextField variant="outlined" rows="4" multiline className="standard-basic-multi" label="Nom de domaine autorisé"  onChange={(e)=>{this.props.onChangeContent(e,this.props.title,'domain')}} defaultValue={this.props.content[this.props.title].domain} />
          </div>
        </div>)
      }
}
export { Tullets};
