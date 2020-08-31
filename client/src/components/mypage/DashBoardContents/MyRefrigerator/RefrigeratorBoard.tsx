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
import useGetRequest from '../../../../utils/hooks/useGetRequest';
import {UseGetRequestObject} from '../../../../utils/hooks/useGetRequest';
import { usePostRequest } from '../../../../utils';

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

  interface Ingredient{
    idIngredient:string;
    strDescription:string|null;
    strIngredient : string|null;
    strType : string|null;
    strAlcohol : string|null;
    strABV:string|null;
}


function RefrigeratorBoard():JSX.Element{
    
    const classes = useStyles();
    const {open , handleOpen, handleClose } = useDialog();
    const findAllRequest = useGetRequest('/mypage/refrigerator/findAll');
    const deleteRequest = usePostRequest('/mypage/refrigerator/delete',() => {
        window.location.reload();
    });
    const [myIngredientsList, setMyIngredientsList] = React.useState<Ingredient[]>(findAllRequest.data as Ingredient[]);
    const [changeFlag, setChangeFlag] = React.useState(false);
    const selectedIngredients:any[] = [];
    React.useEffect(() => {
        setMyIngredientsList(findAllRequest.data as Ingredient[]);
    },[findAllRequest.data]);


    const handleSelectedIngredients = (index: number, PushOrPop: boolean) => {
        if(PushOrPop){
            if(myIngredientsList != undefined)
                selectedIngredients.push(myIngredientsList[index]);
            console.log('selectedIngredients PUSH',selectedIngredients);
        }
        else{
            selectedIngredients.splice(selectedIngredients.indexOf(index),1);
            console.log('selectedIngredients POP',selectedIngredients);
        }
    }

    const handleDeleteButton = () => {
        deleteRequest.doPostRequest(selectedIngredients);
    }

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
                                onClick={handleDeleteButton}
                            >
                                삭제하기
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container justify="center" spacing={5}>
                        {myIngredientsList!= undefined && myIngredientsList.map((item,index)  => (   
                        <Grid item>
                            <RefrigeratorItem
                                index={index}
                                handleSelectedIngredients={handleSelectedIngredients}
                                name={item.strIngredient as string}
                                type={item.strType as string}
                                alcohol={item.strAlcohol as string}  
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
            <RefrigeratorAddDialog
                setChangeFlag={setChangeFlag}
                request={findAllRequest.doGetRequest}
                open={open} 
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </div>
            
    );
}

export default RefrigeratorBoard;