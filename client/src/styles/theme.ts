import {createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ffe8cc',
        main: '#ffc078',
        dark: '#e03131',
        contrastText: '#ffff',
      },
      secondary:{
          main: '#22b8cf',
          light: '#339af0',
          dark: '#1864ab', 
          contrastText: '#ffff',
      },

    },
    typography: {
      fontFamily: "Oxygen",
    }
  });
  
  export default theme;