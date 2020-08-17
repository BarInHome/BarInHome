import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RefrigeratorItem from './RefrigeratorItem';

import  testItems  from "./test-items";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop:"15px"
    },
    refg: {
        height: "auto",
        minHeight:"200px",
        minWidth: "800px",
        border:"solid",
        borderColor: theme.palette.primary.main,
    },
    title: {
        marginBottom: "15px",
    },
    rootCard: {
        maxWidth: 200,
        maxHeight:400,
      },
      media: {
        height: 200,
      },
  }));

function RefrigeratorBoard():JSX.Element{
    const classes = useStyles();

    return (
        <div style={{ marginTop: 20, padding: 30 }}>
            <Grid container spacing={10} justify="center">
                {testItems.map(testItems => (   
                <Grid item key={testItems.title}>
                    <RefrigeratorItem
                        image={testItems.image}
                        title={testItems.title}
                        excerpt={testItems.excerpt}    
                    />
                </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default RefrigeratorBoard;