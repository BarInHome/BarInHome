import React from 'react';
import { Grid, Paper, Typography } from "@material-ui/core";
//import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import  testItems  from "./test-items";
import { makeStyles } from '@material-ui/core/styles';
import useGetRequest from '../../utils/hooks/useGetRequest';
import useInputChange from '../../utils/hooks/useInputChange';
import history from '../../history';
import { request } from 'https';

const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      maxHeight:400,
    },
    media: {
      height: 200,
    },
  });
  
interface cocktails{
    cocktailName:string,
    ingredient:string,
    maxIngredient:number
}
 
function CocktailBoard():JSX.Element {
    const classes = useStyles();
    console.log("cocktailboard");

    const cocktailname = useInputChange();
    const ingredient = useInputChange();
    const maxIngredient = useInputChange();

    const doGetRequest = useGetRequest<void,[cocktails]>('/main',()=>{
        console.log('allocation cocktails');
    });
    doGetRequest.doGetRequest();
    
    if(doGetRequest.data!=null){
        doGetRequest.data.forEach(function(value){
            cocktailname.setValue(value.cocktailName);
            ingredient.setValue(value.ingredient);
            maxIngredient.setValue(value.maxIngredient.toString());
        })
    }
    else
        history.push('/myrefg');

    return (
        <div style={{ marginTop: 20, padding: 30 }}>
        <Grid container spacing={10} justify="center">
            {testItems.map(testItems => (
            <Grid item key={testItems.title}>
                <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={testItems.image}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="subtitle1">
                        {testItems.title}
                    </Typography>
                    <Typography component="p">{testItems.excerpt}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
        </div>
    );
}

export default CocktailBoard;