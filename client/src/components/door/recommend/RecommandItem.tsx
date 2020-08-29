import React,{useEffect,useState} from 'react';
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


const useStyles = makeStyles({
    root: {
      maxWidth: 200,
      maxHeight:400,
    },
    media: {
      height: 200,
    },
  });


function RecommandItem(): JSX.Element {
    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={testItems[0].image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">
                        {testItems[0].title}
                    </Typography>
                    <Typography component="p">{testItems[0].excerpt}</Typography>
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
    );
}

export default RecommandItem;