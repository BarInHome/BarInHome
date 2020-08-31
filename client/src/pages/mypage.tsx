import React from 'react';
import DashBoard from '../components/mypage/DashBoardManager/DashBoardmanager';
import {Grid , Paper , AppBar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import useGetRequest from '../utils/hooks/useGetRequest';
import {UseGetRequestObject} from '../utils/hooks/useGetRequest';
const useStyles = makeStyles({
    root: {
        paddingTop: '50px',
    },
  });

  interface Ingredient{
    strIngredient: string;
    strType: string;
    strAlcohol: string;
  }
  
function Mypage(): JSX.Element {
    const classes = useStyles();
    const myRerigeratorData = useGetRequest<void,Ingredient[]>('/mypage/refrigerator/findAll');

    return(
        <Grid container xs={12} spacing={5} justify="center" className={classes.root}>
            <Grid item xs={12}> 
                <DashBoard
                  
                />
            </Grid>
        </Grid>
    );
}

export default withRouter(Mypage);
