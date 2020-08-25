import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop:"15px"
    },
    refg: {
        height: "auto",
        minHeight:"200px",
        minWidth: "800px",
        border:"solid",
        borderColor: theme.palette.primary.main,
    },
    title: {
        marginBottom: "15px",
    },
    rootCard: {
        maxWidth: 200,
        maxHeight:400,
      },
      media: {
        height: 200,
      },
  }));

interface RefrigeItemInterface{
    image: any;
    title: string;
    excerpt : string;
}

export default function RefrigeratorItem(props:RefrigeItemInterface): JSX.Element {
    const {
        image, title, excerpt,
    } = props;
    const classes = useStyles();

    return (
        <Card className={classes.rootCard}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={image}
                    title="Contemplative Reptile"
                />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1">
                            {title}
                        </Typography>
                        <Typography component="p">{excerpt}</Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    );
}