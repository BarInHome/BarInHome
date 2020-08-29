import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {GridList,Typography,Card,CardActionArea,CardActions,CardContent
    ,CardMedia,Button,Grid,IconButton,Container,Box}from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import  testItems  from "./testcard";
import Carousel from 'react-elastic-carousel';
import useDialog from '../../utils/hooks/useDialog';
import Cocktaildialog from './Cocktaildialog';

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

function CocktailRecIngre():JSX.Element {
    const classes = useStyles();  
    const {open , handleOpen, handleClose } = useDialog();
    const handleDialog = () => {
      console.log("dialog open");
      handleOpen();
    }

    return(
      <div>
      <Cocktaildialog open={open} handleOpen={handleOpen} handleClose={handleClose}/>
      <Container maxWidth={'xl'}>
        <Box ml={8} mb={1}>
          <Typography variant="h5">
          재료추천
          </Typography>
        </Box>
        <Carousel itemPadding={[10, 5]} itemsToShow={6} itemsToScroll={3}>
          {testItems.map(testItems => (
          <Grid item key={testItems.title}>
              <Card className={classes.root}>
              <CardActionArea onClick={handleDialog}>
                  <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={testItems.image}
                  title="Contemplative Reptile"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5">
                      {testItems.title}
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
      </Container>
      </div>
    );
}

export default CocktailRecIngre;

