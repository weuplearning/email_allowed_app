import React from 'react';
import logo from './logo.svg';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Tullets } from './components/Tullet.js';
import 'react-app-polyfill/ie11';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import $ from "jquery"
import FormDialog  from './components/FormDialog.js';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars(props) {
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

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        data :{},
        textadd : "",
        textremove : "",
        onLoad : true,
        open : false
      }
    this.fetchingData = this.fetchingData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addOrg = this.addOrg.bind(this)
    this.removeOrg = this.removeOrg.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    }
    getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
      }
   handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        open : false
      });
    };
    fetchingData(type){
      const headers = new Headers({
              'X-CSRF-TOKEN': this.getCookie('csrftoken')
          });
      if (type == 'get'){
        fetch('/tma_apps/tma_api/v0/email_allowed/',
            {
                credentials: "same-origin",
                method: "GET",
            }
        )
        .then(response => response.json())
        .then((json) => {
          var dataFetched = json
          this.setState({ data: dataFetched,onLoad : false})
          }).catch(function(error) {
              this.setState({onLoad:true,})
              console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          })
      }else if (type == 'post'){
        fetch('/tma_apps/tma_api/v0/email_allowed/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': window.csrf
          },
            body: JSON.stringify(this.state.data)
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
          });
      }
    }
    removeOrg(org){
        var datacopy = JSON.parse(JSON.stringify(this.state.data))
        delete datacopy[org]
        this.setState({data: datacopy},()=>this.handleSubmit());
    }
    addOrg(e){
        var datacopy = JSON.parse(JSON.stringify(this.state.data))
        console.log(Object.keys(this.state.data))
        console.log(e)
        if(e === "" || e.trim() === "" || Object.keys(this.state.data).indexOf(e) != -1){
          this.setState({
            open : true
          })
        }else{
          datacopy[e] = {"compteurMax": 0,"compteurTotal" : 0,'domain' : []};
          this.setState({data: datacopy},()=> this.handleSubmit());
        }
    }
    _handleTextFieldChange(e,type) {
        if (type == 'add'){
          console.log(e)
          this.addOrg(e)
        }else if(type == 'remove'){
          this.setState({
              textremove: e.target.value
          });
        }

     }
    handleChange(event,org,type) {
      var datacopy = JSON.parse(JSON.stringify(this.state.data))
      var datatochange = event.target.value;
      console.log(type)
      if (type === "domain"){
        datatochange = datatochange.trim().split(",");
      }else if (type === "compteurMax" || type === "compteurTotal"){
        datatochange = parseInt(datatochange)
      }
      datacopy[org][type] = datatochange
      this.setState({data: datacopy});
    }

    handleSubmit(event) {
      this.fetchingData('post')

    }
    componentDidMount() {
      if(this.state.onLoad){
        this.fetchingData('get')
      }
    }
    render(){
      return (
        <div className="App">
          <header className="App-header">
          {this.state.onLoad ?
            (  <LinearProgress color="primary"/>)
            :
            Object.keys(this.state.data).map((org,i) =>{
              return (
                <header key={i} className = 'insideheader'>
                  <ExpansionPanel className="semaine" >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        className="semaine-title"
                      >
                      {org}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={'wrapper-expansion'}>
                        <Tullets  handleSubmit={this.handleSubmit} onChangeContent={this.handleChange} content={this.state.data} title={org}/>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={()=>{this.removeOrg(org)}} defaultValue={this.state.textremove}>Supprimer</Button>
                        <Button size="small" onClick={(e)=>{this.handleSubmit(e)}} color="primary">
                            Save
                        </Button>
                    </ExpansionPanelActions>
                  </ExpansionPanel>
                </header>
              )
            })
          }
            <div id ="org-handler">
            <FormDialog handletextchange={this._handleTextFieldChange}/>
            </div>
          </header>
          <CustomizedSnackbars open={this.state.open} handleClose={this.handleClose}/>
        </div>
      );
  }
}

export default App;
