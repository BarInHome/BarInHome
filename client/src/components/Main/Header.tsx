import React, { useEffect } from  'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {Link , withRouter} from 'react-router-dom';
// hooks
import {useLoginValue,usePostRequest} from '../../utils';


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
  const {isLogin,setIsLogin,check} = useLoginValue();
  const {doPostRequest} = usePostRequest<void,any>('/auth/logout',()=>{
    console.log("[Logout Success]");
  });

  const onClickLogout = () => {
    doPostRequest();
    check();
  }

  const onClickRefg = () => {
    console.log('refg');  
  } 

  useEffect(()=>{
    check();
  },[check, isLogin])

  return (  
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bar In Home
          </Typography>
          {isLogin?(
            <Grid align-items-xs-center justify-xs-flex-end>
           <Link to='/main'>
              <Button 
                color="secondary" 
                variant="contained" 
                className={classes.menuButton}
                onClick={onClickRefg}
              >
                Recommand Drinks
              </Button>
           </Link>
           <Link to='/myrefg'>
              <Button 
                color="secondary" 
                variant="contained" 
                className={classes.menuButton}
                onClick={onClickRefg}
              >
                My Refrigerator
              </Button>
           </Link>
           <Link to='/'>
           <Button 
                color="secondary" 
                variant="contained"
                onClick={onClickLogout}
              >
                Logout
            </Button>
           </Link>
            </Grid>
          ):(
            <Button color="secondary" variant="contained">Login Please</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);