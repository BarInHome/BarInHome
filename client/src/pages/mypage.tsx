import React from 'react';
import DashBoard from '../components/Mypage/DashBoardManager/DashBoardmanager';
import {Grid , Paper , AppBar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        paddingTop: '50px',
    },
  
  });

function Mypage(): JSX.Element {
    const classes = useStyles();

    return(
        <Grid container xs={12} spacing={5} justify="center" className={classes.root}>
            <Grid item xs={12}> 
                <DashBoard/>
            </Grid>
        </Grid>
           
       
    );
}

export default Mypage;