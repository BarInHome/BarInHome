import { fade,makeStyles, Theme,createStyles } from '@material-ui/core/styles';
import React,{useEffect,useState} from 'react';
import {Button,Dialog,DialogTitle,DialogActions,DialogContent,Grid,TextField,
        FormControl,Select,Input,InputBase,InputLabel,MenuItem,AppBar
        ,Toolbar,IconButton,Box,Card,CardActionArea,CardMedia,CardContent,
        CardActions,Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import  testItems  from "./test-items";
import RefrigeratorItem from './RefrigeratorItem';
import { spacing } from '@material-ui/system';
import Carousel from 'react-elastic-carousel';
import usePostRequest from '../../../../utils/hooks/usePostRequest'

// // interface RefrigeratorInterface{
// //     open:boolean;
// //     handleClose:()=>void;
// //     handleOpen:()=>void;
// //     setIngredienttype:React.Dispatch<React.SetStateAction<string>>;
// //     setIngredient:React.Dispatch<React.SetStateAction<string>>;
// //     ingredient:string;
// //     ingredienttype:string;
// // }
// interface ingredientinterface{
//   ingredient:string;
//   ingredienttype:string;
// }

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        maxWidth: 360,
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface DialogProps{
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    defaultInfo?: any;
}
interface ingredientinterface{
  ingredient:string;
  ingredienttype:string;
}

function RefrigeratorAddDialog(props:DialogProps):JSX.Element{
    const {
        open, handleOpen, handleClose ,
    } = props;
    const classes = useStyles();
    const [inputingredients, setInpuingredients] = useState<ingredientinterface[]>([]);
    const [ingredienttype, setIngredienttype] = useState<string[]>(['']);
    const [ingredients, setIngredients] = useState<string[]>(['']);
    const [selecttype, setselecttype] = useState<string>('');

    // const handleChangeSelect1 = (event: React.ChangeEvent<{value: unknown}>) => {
    //     setselecttype(String(event.target.value) || ''); 
    // };
    const {data:type, doPostRequest:typeRequest} = usePostRequest<void,string[]>('/refrigerator/types',()=>{
        console.log('[Get types]');
    });
    const {data:ingredient, doPostRequest:ingredientRequest} = usePostRequest<string,string[]>('/refrigerator/ingredients',()=>{
        console.log('[Get Ingredients]');
    });        

    useEffect(() => {
        console.log("selecttype: "+selecttype);
        setIngredients([]);
        
        ingredientRequest(selecttype);
        if(ingredient!=null)
            setIngredients(ingredient);
        // let ingredientList:string[] = []
        // for(let element of ingredientData){
        //     if(ingredienttype==element.strType){  
        //         console.log(element.strIngredient)
        //         ingredientList.push(element.strIngredient);
        //     }
        // }
        // console.log(ingredientList); 
        // setIngredients(ingredientList);
    },[selecttype]);

    useEffect(() => {
        
        typeRequest();
        if(type!=null)
            setIngredienttype(type);
    },[]);

    return(
        <Dialog
            maxWidth="lg"
            open={open} 
            onClose={handleClose}
            fullWidth={true}
            aria-labelledby="form-dialog-title">
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                                <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <Button variant="contained" color="secondary">
                                추가하기
                            </Button>
                        <div className={classes.grow} />
                        
                        <IconButton aria-label="close" className={classes.closeButton} onClick={()=>{handleClose();}}>
                            <CloseIcon />
                        </IconButton>
                    
                    </Toolbar>
                </AppBar>
            </div>
            <DialogContent>
                <Grid container className={classes.root} spacing={2} xs={12} direction="row" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={selecttype}
                                // onChange={handleChangeSelect1}
                                input={<Input />}
                            >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {ingredienttype.map((ingredientsList,index)=>{
                            return (<MenuItem value={ingredientsList} key={index}>{ingredientsList}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                // value={ingredienttype}
                                // onChange={handleChangeSelect1}
                                input={<Input />}
                            >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {ingredienttype.map((ingredientsList,index)=>{
                            return (<MenuItem value={ingredientsList} key={index}>{ingredientsList}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                // value={ingredienttype}
                                // onChange={handleChangeSelect1}
                                input={<Input />}
                            >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {/* {typeList} */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <Box mt={2} ml={5}>
                            <Button variant="contained" color="secondary" className={classes.formControl}>
                                    추가하기    
                            </Button>
                        </Box>          
                    </Grid>
                    <Grid item container justify="center" spacing={5}>
                        {testItems.map(testItems => (   
                        <Grid item key={testItems.title}>
                            <RefrigeratorItem
                                image={testItems.image}
                                title={testItems.title}
                                excerpt={testItems.excerpt}    
                            />
                        </Grid>
                        ))}
                    </Grid>
                    {/* <Grid item xs={12} >
                        <Carousel itemPadding={[10, 5]} itemsToShow={6} itemsToScroll={3}>

                        </Carousel>
                    </Grid> */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} variant="contained" color="primary">
                    Previous
                </Button>
                <Button autoFocus onClick={handleClose} variant="contained" color="primary">
                    Next
                </Button>
            </DialogActions>
       </Dialog>
    );
}

export default RefrigeratorAddDialog;


// export default function RefrigeratorDialog(props:any) {
//     const {open,handleClose,setIngredienttype,setIngredient,ingredient,ingredienttype}=props;
//     const classes = useStyles();
//     const [ingredients, setIngredients] = React.useState<string[]>(['']);
//     const {doPostRequest} = usePostRequest<ingredientinterface,boolean>('/refrigerator/insert',()=>{
//       console.log('[insert success]');
//     }) 
    
//     const handleChangeSelect1 = (event: React.ChangeEvent<{value: unknown}>) => {
//       setIngredienttype(String(event.target.value) || ''); 
//     };
//     const handleChangeSelect2 = (event: React.ChangeEvent<{ value: unknown }>) => {
//       setIngredient(String(event.target.value) || '');
//     };
//     const handleInsert = () => {
//       doPostRequest({
//         ingredient:ingredient,
//         ingredienttype:ingredienttype
//       });
//       handleClose();
//     };

//     useEffect(() => {
//       setIngredients([]);
//       console.log("ingredienttype: "+ingredienttype);
      
//       let ingredientList:string[] = []
//       for(let element of ingredientData){
//         if(ingredienttype==element.strType){  
//           console.log(element.strIngredient)
//           ingredientList.push(element.strIngredient);
//         }
//       }
//       console.log(ingredientList); 
//       setIngredients(ingredientList);
//     },[ingredienttype]);

//     let typesset = new Set<string>();
//     for(let element of ingredientData)
//         if(element.strType!=null)
//             typesset.add(element.strType);
//     const typearray:string[] = [...Array.from(typesset)];
//     const typeList = typearray.map(type => <MenuItem value={type}>{type}</MenuItem>);
    
//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>{"새로운 재료"}</DialogTitle>
//             <DialogContent>
                // <form className={classes.container}>
                    // <FormControl className={classes.formControl}>
                    //     <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                    //     <Select
                    //         labelId="demo-dialog-select-label"
                    //         id="demo-dialog-select"
                    //         value={ingredienttype}
                    //         onChange={handleChangeSelect1}
                    //         input={<Input />}
                    //     >
                    //     <MenuItem value="">
                    //       <em>None</em>
                    //     </MenuItem>
                    //     {typeList}
                    //     </Select>
                    // </FormControl>
                //     <FormControl className={classes.formControl}>
                //         <InputLabel id="demo-dialog-select-label">재료</InputLabel>
                //         <Select
                //             labelId="demo-dialog-select-label"
                //             id="demo-dialog-select"
                //             value={ingredient}
                //             onChange={handleChangeSelect2}
                //             input={<Input />}
                //         >
                //         <MenuItem value="">
                //           <em>None</em>
                //         </MenuItem>
                //         {ingredients.map((ingredientsList,index)=>{
                //           return (<MenuItem value={ingredientsList} key={index}>{ingredientsList}</MenuItem>)
                //         })}
                //         </Select>
                //     </FormControl>
                // </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button autoFocus onClick={handleInsert} color="primary">
//                     추가
//                 </Button>
//                 <Button autoFocus onClick={handleClose} color="primary">
//                     닫기
//                 </Button>
//             </DialogActions> 
//         </Dialog>
//     );
// }


