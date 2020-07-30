import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop:"15px"
    },
    refg: {
        height: "auto",
        minHeight:"200px",
        width: "auto",
        border:"solid",
        borderColor: theme.palette.primary.main,
    },
    title: {
        marginBottom: "15px",
  
    }
  }));


function RefrigeratorBoard():JSX.Element{
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.refg}>
                
            </Grid>
        </div>
    );
}

export default RefrigeratorBoard;