import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import oc from 'open-color';

//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: "20px"
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      background:"#ff922b", 
    }
  }),
);

function Header() {
  const classes = useStyles();  

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bar In Home
          </Typography>
          <Button color="secondary" variant="contained">Login</Button>
          <Button color="secondary" variant="contained">My Refrigerator</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;