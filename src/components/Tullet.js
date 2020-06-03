import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';

const Tullets = ({ onChangeContent, title, content }) => {
  return (
    <div className={'tulletWrapper'}>
      <div className="field">
        <TextField className="standard-basic-field" label="Compteur maximal" onChange={(e) => { onChangeContent(e, title, 'compteurMax') }} type="number" defaultValue={content[title].compteurMax} />
        <TextField className="standard-basic-field" label="Compteur actuel" onChange={(e) => { onChangeContent(e, title, 'compteurTotal') }} type="number" defaultValue={content[title].compteurTotal} />
      </div>
      <div className="field">
        <TextField variant="outlined" rows="4" multiline className="standard-basic-multi" label="Nom de domaine autorisé" onChange={(e) => { onChangeContent(e, title, 'domain') }} defaultValue={content[title].domain} />
      </div>
    </div>)
}

export { Tullets };
