import React from 'react';

import RecommandItem from './RecommandItem';
import {Grid , Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: "20px"
    },
  });
  
function RecommandRoot():JSX.Element {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container xs={12} direction="column" justify="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h5">
                        오늘의 추천 칵테일
                    </Typography>
                </Grid>
                <Grid item container direction="row" justify="center" spacing={2}>
                    <Grid item>
                        <RecommandItem/>
                    </Grid>
                    <Grid item>
                        <RecommandItem/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    ); 
}

export default RecommandRoot;
