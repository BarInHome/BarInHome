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
import Button from '@material-ui/core/Button';
import  testItems  from "./test-items";
import Paper from '@material-ui/core/Paper';

import useDialog from '../../../../utils/hooks/useDialog';
import RefrigeratorAddDialog from './RefrigeratorAddDialog';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop:"2px"
    },
    listWrapper: {
        padding: '20px',
    },
    paperWraper: {
        minHeight: '800px',
        padding : '24px',
    }
  }));

function RefrigeratorBoard():JSX.Element{
    const classes = useStyles();
    const {open , handleOpen, handleClose } = useDialog();

    return (
        <div>
            <Grid container spacing={2} xs={12} direction="column" justify="center" className={classes.root}>
                <Paper elevation={5} className={classes.paperWraper}>
                    <Grid item container direction="row" justify="center" xs={12} spacing={5}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={()=>handleOpen()}
                            >
                                추가하기
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                            >
                                삭제하기
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" spacing={5}>
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
                </Paper>
            </Grid>
            <RefrigeratorAddDialog
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />

        </div>
            
    );
}

export default RefrigeratorBoard;