import {createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ffe8cc',
        main: '#ffc078',
        dark: '#d9480f',
        contrastText: '#ffff',
      },
      secondary:{
          main: '#f03e3e', 
          contrastText: '#ffff',
      }
    },
    typography: {
      fontFamily: "Oxygen",
    }
  });
  
  export default theme;