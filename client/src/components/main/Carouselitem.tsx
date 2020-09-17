import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {GridList,Typography,Card,CardActionArea,CardActions,CardContent
    ,CardMedia,Button,Grid}from '@material-ui/core';
import useDialog from '../../utils/hooks/useDialog';
import Cocktaildialog from './Cocktaildialog';

interface poscocktailinfo{
    strdrink:string;
    strdrinkthumb:string;
    stringredient:string[];
    strmeasure:string[];
    strinstructions:string;
    flag?:boolean[];
} 
interface CarouselProps{
    cocktailInfo:poscocktailinfo[];
    defaultInfo?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
    media: {           // this is the`className` passed to `CardMedia` later
        height: '100%',     // as an example I am modifying width and height
        width: '100%',
    },
}));


function CarouselItem(props:CarouselProps){
    const {cocktailInfo} = props;
   
    const classes = useStyles();

    const {open , handleOpen, handleClose } = useDialog();
    const [selectcocktail, setselectcocktail ] = React.useState<poscocktailinfo>({} as poscocktailinfo);

    const handleDialog = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        console.log(e.target);
        const {name,tag} = (e.target as HTMLButtonElement).dataset;
        console.log(name);
        for(let cocktail of cocktailInfo){
            if(cocktail.strdrink == name){
                setselectcocktail(cocktail);
            }
        }   
        handleOpen();
    };
    
    return (
        <div>
        <Cocktaildialog open={open} handleOpen={handleOpen} handleClose={handleClose} cocktailInfo={selectcocktail}/>
            <Grid container item xs={12} spacing={1} direction="row" justify="center" alignItems="center">
                {cocktailInfo!=undefined && cocktailInfo.map((cocktail,index) => ( 
                    <Grid item xs={3} key={cocktail.strdrink}>
                        <Card className={classes.root}>
                            <CardActionArea onClick={handleDialog}>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                className={classes.media}
                                image={cocktail.strdrinkthumb}
                                title={cocktail.strdrink}
                                data-name={cocktail.strdrink}
                                data-tag="cocktail"
                                />
                                <CardContent>
                                <Typography data-name={cocktail.strdrink} data-tag="cocktail" gutterBottom variant="h5">
                                    {cocktail.strdrink}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions disableSpacing>
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
        </div>);
}
export default CarouselItem;