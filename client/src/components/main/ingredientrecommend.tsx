import React from 'react';
import { Grid, Card, CardActionArea, CardActions, CardContent,
    CardMedia, Button,Typography,GridList,GridListTile,GridListTileBar,
    IconButton} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import  testItems  from "./test-items";

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
    root: {
        maxWidth: 200,
        maxHeight:400,
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
    media: {
        height: 200,
    },
    }),
);

function Ingredientrecommend():JSX.Element{
    const classes = useStyles();

    return (
        <GridList className={classes.gridList} cols={2.5}>
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
        </GridList>
    )
}

export default Ingredientrecommend;