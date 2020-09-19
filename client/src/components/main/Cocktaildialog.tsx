import React from 'react';
import {DialogTitle,Dialog,AppBar,Toolbar,Typography,Grid,Box,DialogContent,Card,CardMedia,
        ListItem,ListItemText,Divider,List} from '@material-ui/core';
import { createStyles, makeStyles,Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import Dialogcomment from './Dialogcomment';

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
    },
    inline: {
        display: 'inline',
    },
  }),
);

function Cocktaildialog(props:DialogProps):JSX.Element {
    const {open,handleOpen,handleClose,cocktailInfo}=props
    const [value, setValue] = React.useState<number | null>(0);
    const [cocktailname, setcocktailname] = React.useState<string|null>('');
    const classes = useStyles();
    console.log("cocktailInfo : ",cocktailInfo);

    React.useEffect(()=>{
        console.log("cocktailname in dialog ",cocktailInfo!.strdrink);
        setcocktailname(cocktailInfo!.strdrink);
    },[cocktailInfo])

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
                    <Grid item xs={6}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                            <Grid item>
                                <Box mt={4}>
                                    <Card className={classes.img}>
                                        <img
                                            className={classes.img} 
                                            src = {cocktailInfo!.strdrinkthumb}>
                                        </img>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" spacing={1} justify="center" alignItems="center">
                                    {cocktailInfo!=undefined && cocktailInfo.stringredient!=undefined && cocktailInfo.stringredient
                                    .map((stringredient,index) => (
                                        <>
                                        {cocktailInfo.flag!=undefined && cocktailInfo.flag[index] ? 
                                            <><Grid item xs={5}><Typography>{stringredient}</Typography></Grid>
                                            <Grid item xs={5}><Typography>{cocktailInfo.strmeasure[index]}</Typography></Grid></>:
                                            <><Grid item xs={5}><Typography color="error" >{stringredient}</Typography></Grid>
                                            <Grid item xs={5}><Typography color="error" >{cocktailInfo.strmeasure[index]}</Typography></Grid></>
                                        }
                                        </>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item>
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
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column" justify="center" alignItems="baseline">
                            <Grid item>
                                <Box ml={4}> 
                                    <Typography variant="h5" gutterBottom>
                                        {cocktailInfo!=undefined && cocktailInfo.strinstructions}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Dialogcomment open={open} cocktailname={cocktailname}/>
                            </Grid>
                        </Grid>
                    </Grid>          
                </Grid>
            </DialogContent>
       </Dialog>
    );
}

export default Cocktaildialog;