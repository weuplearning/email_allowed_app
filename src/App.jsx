import React from "react";
import "react-app-polyfill/ie11";
import DomainsManager from "./containers/DomainsManager"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#80CFF5'
    },
    secondary: {
      main : 'rgb(255, 170, 22)'
    },
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <DomainsManager/>
    </MuiThemeProvider>
  )
  
}

export default App;
