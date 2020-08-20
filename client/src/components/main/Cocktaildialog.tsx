import React from 'react';
import {DialogTitle,Dialog,AppBar,Toolbar,Typography,Grid,Paper,Card,CardMedia
        ,Table,TableBody,TableCell,TableContainer,TableRow,Box,DialogContent,
        DialogContentText, List, ListItem, Divider, ListItemText} from '@material-ui/core';
import { createStyles, makeStyles,Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
interface cocktailinterface{
    ingrediet:string[];
    measure:string[];
    instruct:string;
    cocktailname:string;
}

interface DialogProps{
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    cocktailInfo?:cocktailinterface;
    defaultInfo?: any;
}

const testItem={
    title: "My 4 post",
    excerpt: "This is my fourth post with more content inside",
    image: "https://bit.ly/2WNi2Ml"
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    // media: {
    //     height: '50%',
    //     width: '50%',
    //     objectFit: 'cover'
    // },
    table: {
        minWidth: 650,
    },
    // image: {
    //     backgroundImage: 'url(https://source.unsplash.com/random)',
    //     backgroundRepeat: 'no-repeat',
    //     height: '50%',
    //     width: '50%',
    //     backgroundPosition: 'center',
    // },
    img: {
        height: '50%',
        width: '50%',
        objectFit: 'cover',
        
    },
    inline: {
        display: 'inline',
    },
  }),
);

function createData(name: string, measure: number) {
    return { name, measure };
}
const rows = [
    createData('Frozen yoghurt', 4),
    createData('Ice cream sandwich', 9.0),
    createData('Eclair', 24),
    createData('Cupcake', 3.7),
    createData('Gingerbread', 16.0),
];

function Cocktaildialog(props:DialogProps):JSX.Element {
    const {open,handleOpen,handleClose}=props
    const [value, setValue] = React.useState<number | null>(0);
    const classes = useStyles();

    const defaultImage = 'https://bit.ly/2WNi2Ml';

    return(
        <Dialog
            maxWidth='lg'
            fullWidth={false}
            open={open} 
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    칵테일설명
                </Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container xs={12} direction="row" justify="center"spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        {/* <Paper> */}
                           <img
                               className={classes.img}                               
                               src={defaultImage}
                           />
                        {/* </Paper> */}
                    </Grid> 
                    <Grid item xs={6}>
                    <List className={classes.root}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary="Brunch this weekend?"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary="Summer BBQ"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        to Scott, Alex, Jennifer
                                    </Typography>
                                    {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary="Oui Oui"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Sandra Adams
                                    </Typography>
                                    {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                        </List>
                    </Grid>  
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            cocktail recipe cocktail recipe cocktail recipe cocktail recipe
                            cocktail recipe cocktail recipe cocktail recipe cocktail recipe
                            cocktail recipe cocktail recipe cocktail recipe cocktail recipe
                            cocktail recipe cocktail recipe cocktail recipe cocktail recipe 
                        </Typography>
                    </Grid> 
                    <Grid item xs={6}>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Box component="fieldset" mb={6} borderColor="transparent">
                            <Typography component="legend">Controlled</Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                size="large"
                                onChange={(event:any, newValue:number|null) => {
                                setValue(newValue);
                            }}
                            />
                        </Box>
                    </Grid> 
                    <Grid item xs={6}>
                        
                    </Grid>             
                </Grid>
            </DialogContent>
       </Dialog>
    );
}

export default Cocktaildialog;






{/* <Card className={classes.root}>
                            
                            <CardMedia
                                className={classes.img}
                                component="img"
                                alt="Contemplative Reptile"
                                height="50"
                                image={defaultImage}
                                title="Contemplative Reptile"
                            />
                            {/* <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {testItems.title}
                                </Typography>
                            </CardContent> */}
                        // </Card> */}
