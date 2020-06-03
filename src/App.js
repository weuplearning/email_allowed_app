import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { Tullets } from './components/Tullet.js';
import 'react-app-polyfill/ie11';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import FormDialog from './components/FormDialog.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="error">
          Votre nom d'organisation est incorrect !
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


class App extends React.Component {
  state = {
    data: {},
    textadd: "",
    textremove: "",
    onLoad: true,
    open: false
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false
    });
  };

  fetchData = () => {
    fetch('/tma_apps/tma_api/v0/email_allowed/',
      {
        credentials: "same-origin",
        method: "GET",
      }
    )
      .then(response => response.json())
      .then((json) => {
        var dataFetched = json
        this.setState({ data: dataFetched, onLoad: false })
      }).catch((error) => {
        this.setState({ onLoad: true, })
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      })
  }

  saveData = () => {
    fetch('/tma_apps/tma_api/v0/email_allowed/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrf
      },
      body: JSON.stringify(this.state.data)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
    });
  }

  removeOrg = (org) => {
    var datacopy = { ...this.state.data }
    delete datacopy[org]
    this.setState({ data: datacopy }, () => this.handleSubmit());
  }

  addOrg = (e) => {
    var datacopy = { ...this.state.data }
    if (e === "" || e.trim() === "" || Object.keys(this.state.data).indexOf(e) !== -1) {
      this.setState({
        open: true
      })
    } else {
      datacopy[e] = { "compteurMax": 0, "compteurTotal": 0, 'domain': [] };
      this.setState({ data: datacopy }, () => this.handleSubmit());
    }
  }

  _handleTextFieldChange = (e, type) => {
    if (type == 'add') {
      this.addOrg(e)
    } else if (type == 'remove') {
      this.setState({
        textremove: e.target.value
      });
    }

  }

  handleChange = (event, org, type) => {
    var datacopy = { ...this.state.data }
    var datatochange = event.target.value;
    if (type === "domain") {
      datatochange = datatochange.trim().split(",");
    } else if (type === "compteurMax" || type === "compteurTotal") {
      datatochange = parseInt(datatochange)
    }
    datacopy[org][type] = datatochange
    this.setState({ data: datacopy });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.saveData()
  }

  componentDidMount() {
    if (this.state.onLoad) {
      this.fetchData()
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.onLoad ?
            (<LinearProgress color="primary" />)
            :
            Object.keys(this.state.data).map((org, index) => {
              return (
                <header key={index} className='insideheader'>
                  <ExpansionPanel className="semaine" >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      className="semaine-title"
                    >
                      {org}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={'wrapper-expansion'}>
                      <Tullets handleSubmit={this.handleSubmit} onChangeContent={this.handleChange} content={this.state.data} title={org} />
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                      <Button size="small" onClick={() => { this.removeOrg(org) }} defaultValue={this.state.textremove}>Supprimer</Button>
                      <Button size="small" onClick={(e) => { this.handleSubmit(e) }} color="primary">Save</Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </header>
              )
            })
          }
          <div id="org-handler">
            <FormDialog handletextchange={this._handleTextFieldChange} />
          </div>
        </header>
        <CustomizedSnackbars open={this.state.open} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default App;
