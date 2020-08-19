import React from 'react';
import {DialogTitle,Dialog,AppBar,Toolbar,Typography,Grid,Paper,Card,CardMedia
        ,Table,TableBody,TableCell,TableContainer,TableRow,Box,DialogContent,
        DialogContentText} from '@material-ui/core';
import { createStyles, makeStyles,Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    media: {
        height: 140,
    },
    table: {
        minWidth: 650,
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
    const classes = useStyles();

    return(
        <Dialog
            maxWidth="xl"
            open={open} 
            onClose={handleClose}
            fullWidth={true}
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
                <Grid container 
                    spacing={2}
                    justify="flex-start"
                    alignItems="center"
                    >
                    <Grid item xs={6}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image="https://bit.ly/2WNi2Ml"
                                title="Contemplative Reptile"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant="h5">
                                "This is my fourth post with more content inside"
                                칵테일의 제작 설명이나 이야기 들어갈 자리
                                "This is my fourth post with more content inside"
                                칵테일의 제작 설명이나 이야기 들어갈 자리
                                "This is my fourth post with more content inside"
                                칵테일의 제작 설명이나 이야기 들어갈 자리
                                "This is my fourth post with more content inside"
                                칵테일의 제작 설명이나 이야기 들어갈 자리
                                "This is my fourth post with more content inside"
                                칵테일의 제작 설명이나 이야기 들어갈 자리
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item >
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.measure}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </DialogContent>
       </Dialog>
    );
}

export default Cocktaildialog;



{/* <Grid container 
                spacing={3}
                justify="space-evenly"
                alignItems="center"
                xs={12}>
                <Grid item xs={6}>
                    <Box ml={2}>
                        <Typography>
                            "This is my fourth post with more content inside"
                            칵테일의 제작 설명이나 이야기 들어갈 자리
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="https://bit.ly/2WNi2Ml"
                            title="Contemplative Reptile"
                        />
                    </Card>
                </Grid>
                <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.measure}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid> */}