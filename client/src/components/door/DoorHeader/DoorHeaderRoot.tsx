import React from 'react';
import {CardMedia , Typography, Paper, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import  testItems  from "../Recommand/test-items";


const useStyles = makeStyles((theme) => ({
    container: {
      position: 'relative',
      textAlign: 'center',
      alignContent:'center',
      justifyContent: 'center',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        height: '250px',
        backgroundPosition: 'center',
    },
    title: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: theme.palette.primary.contrastText,
        
    }
  }));
function DoorHeaderRoot():JSX.Element {
    const defaultImage = '/images/TEST/header.jpg';
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <Paper elevation={2}>
                <img
                    className={classes.image}
                    src={defaultImage}
                />
            </Paper>
            
            
            <Typography variant="h2" className={classes.title} align="center">
                Bar In Home
            </Typography>
           
            
        </div>
    );
}

export default DoorHeaderRoot;