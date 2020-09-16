import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import AddDialogItems from './add-dialog/AddDialogItems';
import useDialog from '../../../../utils/hooks/useDialog';
import RefrigeratorAddDialog from './add-dialog/RefrigeratorAddDialog';
import useGetRequest from '../../../../utils/hooks/useGetRequest';
import { usePostRequest } from '../../../../utils';

// interface
import { Ingredient } from './MyRerigerator.interface'

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
    },
    buttonWrapper: {
        fontWeight: 'bold',
    }
  }));


function RefrigeratorBoard():JSX.Element{
    
    const classes = useStyles();
    const {open , handleOpen, handleClose } = useDialog();
    const findAllRequest = useGetRequest('/mypage/refrigerator/findAll');
    const deleteRequest = usePostRequest('/mypage/refrigerator/delete',() => {
        findAllRequest.doGetRequest();
    });
    const [myIngredientsList, setMyIngredientsList] = React.useState<Ingredient[]>(findAllRequest.data as Ingredient[]);
    const selectedIngredients:any[] = [];
    React.useEffect(() => {
        setMyIngredientsList(findAllRequest.data as Ingredient[]);
    },[findAllRequest.data]);


    const handleSelectedIngredients = (index: number, PushOrPop: boolean) => {
        if(PushOrPop){
            if(myIngredientsList !== undefined)
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
                                color="secondary"
                                size="large"
                                onClick={()=>handleOpen()}
                            >
                                추가하기
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
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
                            <AddDialogItems
                                index={index}
                                handleSelectedIngredients={handleSelectedIngredients}
                                name={item.strIngredient as string}
                                type={item.strType as string}
                                alcohol={item.strAlcohol as string}
                                abv={item.strABV as string}
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
            <RefrigeratorAddDialog
                request={findAllRequest.doGetRequest}
                open={open} 
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </div>
            
    );
}

export default RefrigeratorBoard;