import React, { SyntheticEvent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {GridList,Typography,Card,CardActionArea,CardActions,CardContent
    ,CardMedia,Button,Grid,IconButton,Container,Box}from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import  testItems  from "./testcard";
import Carousel from 'react-elastic-carousel';
import useDialog from '../../utils/hooks/useDialog';
import Cocktaildialog from './Cocktaildialog';
import usePostRequest from '../../utils/hooks/usePostRequest'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    '& > *': {
      marginTop: theme.spacing(2),
    },
  }),
);

interface poscocktailinfo{
  strdrink:string;
  strdrinkthumb:string;
  stringredient:string[];
  strmeasure:string[];
  strinstructions:string;
  flag?:boolean[];
} 

interface poscocktail{
  poscocktailinfo:poscocktailinfo[];
  implecocktailinfo:poscocktailinfo[];
}

function CocktailRecIngre():JSX.Element {
    const classes = useStyles();  
    const {open , handleOpen, handleClose } = useDialog();
    const [poscocktail, setposcocktail ] = React.useState<poscocktailinfo[]>([]);
    const [implecocktail, setimplecocktail ] = React.useState<poscocktailinfo[]>([]);
    const [selectcocktail, setselectcocktail ] = React.useState<poscocktailinfo>({} as poscocktailinfo);
    
    const {data, doPostRequest} = usePostRequest<void,poscocktail>('/main',() => {
      console.log("request !");
    });

    React.useEffect(() => {
      doPostRequest();
    },[]);
    
    React.useEffect(() => {
      if(data!=null){
        setposcocktail(data.poscocktailinfo);
        setimplecocktail(data.implecocktailinfo);
      }
    },[data]);
    

    const handleDialog = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      console.log(e.target);
      const {name,tag} = (e.target as HTMLButtonElement).dataset;
      console.log(name);
      // setselectcocktail(name);
      if(tag=="poscocktail"){
        for(let cocktail of data!.poscocktailinfo){
          if(cocktail.strdrink == name)
            setselectcocktail(cocktail);
        }
      }
      else if(tag=="implecocktail"){
        for(let cocktail of data!.implecocktailinfo){
          if(cocktail.strdrink == name)
            setselectcocktail(cocktail);
        }
      }
      handleOpen();
    };

    return(
      <div>
      <Cocktaildialog open={open} handleOpen={handleOpen} handleClose={handleClose} cocktailInfo={selectcocktail}/>
      <Grid container>
        <Grid item xs={12}>
          <Box ml={8} mb={1}>
            <Typography variant="h5">
              뚝딱가능
            </Typography>
          </Box>
          <Carousel itemPadding={[10, 5]} itemsToShow={6} itemsToScroll={3}>
            {poscocktail!=undefined && poscocktail.map(poscocktail => (
            <Grid item key={poscocktail.strdrink}>
                <Card className={classes.root}>
                <CardActionArea onClick={handleDialog}>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={poscocktail.strdrinkthumb}
                    title={poscocktail.strdrink}
                    data-name={poscocktail.strdrink}
                    data-tag="poscocktail"
                    />
                    <CardContent>
                    <Typography data-name={poscocktail.strdrink} data-tag="poscocktail" gutterBottom variant="h5">
                        {poscocktail.strdrink}
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
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Box ml={8} mb={1}>
            <Typography variant="h5">
              하나가 아쉬워요...
            </Typography>
          </Box>
          <Carousel itemPadding={[10, 5]} itemsToShow={6} itemsToScroll={3}>
            {implecocktail!=undefined && implecocktail.map(implecocktail => (
            <Grid item key={implecocktail.strdrink}>
                <Card className={classes.root}>
                <CardActionArea onClick={handleDialog}>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={implecocktail.strdrinkthumb}
                    title={implecocktail.strdrink}
                    data-name={implecocktail.strdrink}
                    data-tag="implecocktail"
                    />
                    <CardContent>
                    <Typography data-name={implecocktail.strdrink} data-tag="implecocktail" gutterBottom variant="h5">
                        {implecocktail.strdrink}
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
          </Carousel>
        </Grid>
      </Grid>
      </div>
    );
}

export default CocktailRecIngre;

