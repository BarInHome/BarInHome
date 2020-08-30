import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import MyInfoUser from './MyInfoUser';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '400px',
      paddingTop: '15px',
    },
  }),
);

export default function MyInfo(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          
          <Grid container spacing={3}>
          <MyInfoUser/>
          <Grid item xs={6}>
            <Paper 
              className={classes.paper}
              elevation={4}
            >
                <Typography  
                variant="h5">
                찜한 칵테일
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper 
              className={classes.paper}
              elevation={4}
            >
                <Typography  
                variant="h5">
                친구 목록
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper 
              className={classes.paper}
              elevation={4}
            >
               <Typography  
                variant="h5">
                1등 칵테일
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper 
              className={classes.paper}
              elevation={4}
            >
               <Typography  
                variant="h5">
                아무거나
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}