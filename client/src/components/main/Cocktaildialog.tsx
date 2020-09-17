import React from 'react';
import {DialogTitle,Dialog,AppBar,Toolbar,Typography,Grid,Box,DialogContent,Card,CardMedia} from '@material-ui/core';
import { createStyles, makeStyles,Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';

interface poscocktailinfo{
    strdrink:string;
    strdrinkthumb:string;
    stringredient:string[];
    strmeasure:string[];
    strinstructions:string;
    flag?:boolean[];
} 

interface DialogProps{
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    cocktailInfo?:poscocktailinfo;
    defaultInfo?: any;
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
    img: {
        width:'auto',
        height:'auto',
        maxWidth:350,
        maxHeight:350,
        // objectFit: 'cover',
        
    }
  }),
);

function Cocktaildialog(props:DialogProps):JSX.Element {
    const {open,handleOpen,handleClose,cocktailInfo}=props
    const [value, setValue] = React.useState<number | null>(0);
    const classes = useStyles();
    console.log("cocktailInfo : ",cocktailInfo);

    return(
        <Dialog
            maxWidth='md'
            fullWidth={false}
            open={open} 
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {cocktailInfo!=undefined && cocktailInfo.strdrink}
                </Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container direction="row" justify="center" spacing={2} alignItems="center">
                    
                    <Grid item>
                        <Box mt={4}> 
                            <Card>
                                <img
                                    className={classes.img} 
                                    src = {cocktailInfo!.strdrinkthumb}>
                                </img>
                            </Card>
                        </Box>
                    </Grid> 
                    <Grid item xs={6}>
                        <Box ml={4}> 
                            <Typography variant="h5" gutterBottom>
                                {cocktailInfo!=undefined && cocktailInfo.strinstructions}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}></Grid>

                    <Grid item xs={6}>
                        <Grid container direction="row" spacing={5}>
                        {cocktailInfo!=undefined && cocktailInfo.stringredient!=undefined && cocktailInfo.stringredient
                        .map((stringredient,index) => (
                            <>
                            <Grid item xs={3}></Grid>
                            {cocktailInfo.flag!=undefined && cocktailInfo.flag[index] ? 
                                <><Grid item xs={3}><Typography>{stringredient}</Typography></Grid>
                                <Grid item xs={3}><Typography>{cocktailInfo.strmeasure[index]}</Typography></Grid></>:
                                <><Grid item xs={3}><Typography color="error" >{stringredient}</Typography></Grid>
                                <Grid item xs={3}><Typography color="error" >{cocktailInfo.strmeasure[index]}</Typography></Grid></>
                            }
                            <Grid item xs={3}></Grid>
                            </>
                        ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={6}></Grid>
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
                    <Grid item xs={6}></Grid>            
                </Grid>
            </DialogContent>
       </Dialog>
    );
}

export default Cocktaildialog;


{/* <Box mt={4}>                            
                            <img
                                className={classes.img} 
                                src = {cocktailInfo!.strdrinkthumb}>
                            </img>
                        </Box> */}


{/* <Grid item xs={12}>
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
                    </Grid>   */}

{/* <Grid container direction="column" justify="center" spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <Box mt={4}>                            
                            <img
                                className={classes.img} 
                                src = {cocktailInfo!.strdrinkthumb}>
                            </img>
                        </Box>
                    </Grid> 
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.title}>
                            {cocktailInfo!=undefined && cocktailInfo.strdrink}
                        </Typography>
                    </Grid>
                        {cocktailInfo!=undefined && cocktailInfo.stringredient!=undefined && cocktailInfo.stringredient
                        .map((stringredient,index) => (
                            <Grid item xs={4}>
                                <Grid container direction="row" spacing={5}>
                                    <Grid item xs={6}>
                                        {cocktailInfo.flag!=undefined && cocktailInfo.flag[index] ? 
                                            <Typography>{stringredient}</Typography>:
                                            <Typography color="error" >{stringredient}</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        {cocktailInfo.flag!=undefined && cocktailInfo.flag[index] ? 
                                            <Typography>{cocktailInfo.strmeasure[index]}</Typography>:
                                            <Typography color="error" >{cocktailInfo.strmeasure[index]}</Typography>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            {cocktailInfo!=undefined && cocktailInfo.strinstructions}
                        </Typography>
                    </Grid> 
                    <Grid item xs={12}>
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
                </Grid> */}
