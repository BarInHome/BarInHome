import React from 'react';

import DoorHeader from '../components/header/Header';
import AuthComponent from '../components/door/auth/AuthRoot';
import RecommandComponent from '../components/door/recommend/RecommandRoot';
import Description1 from '../components/Door/Description/Description1';
import Description2 from '../components/Door/Description/Description2';

import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';


const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      maxHeight:400,
    },
    media: {
      height: '250px',
    },
    description: {
        padding: '120px',
    }
  });



function Door(): JSX.Element {
    const classes = useStyles();

    return(
        <Grid container xs={12} direction="row" justify="center">
            <Grid item xs={12} className={classes.media}>
                <DoorHeader/>
            </Grid>
            <Grid item xs={6} className={classes.description}>
                <Description1/>
            </Grid>
            <Grid item xs={6}>
                <AuthComponent/>
            </Grid>
            <Grid item xs={6}>
                <Description2/>
            </Grid>
            <Grid item xs={6}>
                <RecommandComponent/>
            </Grid>
        </Grid>
    );
}

export default Door;