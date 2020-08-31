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
import { Alert,AlertTitle } from '@material-ui/lab';

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
    dialogWrapper: {
        minHeight: '300px',
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

const typeList = [  
'Liqueur',
'Spice',
'Fruit Juice',
'Spirit',
'Beverage',
'Vodka',
'Nuts',
'Syrup',
'Brandy',
'Rum',
'Fruit',
'Wine',
'Beer',
'Others',
'Soft Drink',
'Whiskey',
'Bitter',
'Vegetable',
'Sambuca',
'Cream',
'Sherry',
'Whisky',
'Herb',
'Herb Liqueur',
'Apple Brandy',
'Schnapps',
'Cider',
'Coloring',
'Aperitif',
'Nut',
'Coffee',
'Juice',
'Stout',
'Liquor',
'Fortified Wine',
'Tequila',
'Mezcal',
'Rice wine',
'liqueur',
'Fortified wine',
'Vermouth',
'aperitif',
'Cordial',
'Water',
'Garnish',
'Confectionery',
'Mixer',
'Flower',
'Gin',
'Liquer'];

const alcholList = [
    'No',
    'Yes'
];

interface DialogProps{
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    defaultInfo?: any;
}

interface IngredientFilter {
    strType: string;
    strAlcohol: string; 
}

interface Ingredient{
    idIngredient:string;
    strDescription:string|null;
    strIngredient : string|null;
    strType : string|null;
    strAlcohol : string|null;
    strABV:string|null;
}

function RefrigeratorAddDialog(props:DialogProps):JSX.Element{
    const {
        open, handleClose ,
    } = props;
    const classes = useStyles();
    const [ingredientsList, setIngredientsList ] = React.useState<Ingredient[]>();
    const [selectedType , setSelectedType ] =  React.useState<string>('');
    const [selectedAlchol , setSelectedAlchol ] =  React.useState<string>('');      
    const {data, doPostRequest} = usePostRequest<IngredientFilter,any[]>('/mypage/refrigerator/search');
    const selectedIngredients:any[] = [];
    const addRequest = usePostRequest('/mypage/refrigerator/add');
    
    React.useEffect(() => {
        if(selectedType!=undefined && selectedAlchol!= undefined){
            doPostRequest({
                strType: selectedType,
                strAlcohol: selectedAlchol
            });
        }
    },[selectedType,selectedAlchol]);

    React.useEffect(() => {
        if(data != undefined)
            setIngredientsList(data);
    },[data]);

    // 선택된 재료들을 다시 눌렀을때 발생하는 로직 정의
    const handleSelectedIngredients = (index: number, PushOrPop: boolean) => {
        if(PushOrPop){
            if(ingredientsList != undefined)
                selectedIngredients.push(ingredientsList[index]);
            console.log('selectedIngredients PUSH',selectedIngredients);
        }
        else{
            selectedIngredients.splice(selectedIngredients.indexOf(index),1);
            console.log('selectedIngredients POP',selectedIngredients);
        }
    }

    // 추가하기 버튼 클릭 -> 선택된 리스트 추가post 요청
    // 정말 추가 할 것인지 한번더 알터로 묻는 로직 추가 작성 필요
    const handleAddButton = () => {
        // return(    
        //     <Alert severity="success">
        //         <AlertTitle>Success</AlertTitle>
        //         This is a success alert — <strong>check it out!</strong>
        //     </Alert>
        // );
       
        addRequest.doPostRequest(selectedIngredients);
        handleClose();
    }

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
                            <Button variant="contained" color="secondary" >
                                추가하기
                            </Button>
                        <div className={classes.grow} />
                        
                        <IconButton aria-label="close" className={classes.closeButton} onClick={()=>{handleClose();}}>
                            <CloseIcon />
                        </IconButton>
                    
                    </Toolbar>
                </AppBar>
            </div>
            <DialogContent className={classes.dialogWrapper}>
                <Grid container className={classes.root} spacing={2} xs={12} direction="row" justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={selectedType}
                                // onChange={handleChangeSelect1}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setSelectedType(event.target.value as string);
                                }}
                                input={<Input />}
                            >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {typeList.map((typeList,index)=>{
                            return (<MenuItem value={typeList} key={index}>{typeList}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">도수</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={selectedAlchol}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setSelectedAlchol(event.target.value as string);
                                }}
                                input={<Input />}
                            >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {alcholList.map((alcholList,index)=>{
                            return (<MenuItem value={alcholList} key={index}>{alcholList}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} >
                        <Box mt={2} ml={5}>
                            <Button variant="contained" color="secondary" className={classes.formControl} onClick={handleAddButton}>
                                    추가하기    
                            </Button>
                        </Box>          
                    </Grid>
                    <Grid item xs={2} >
                        <Box mt={2} ml={5}>
                            <Button variant="contained" color="secondary" className={classes.formControl}>
                                    초기화    
                            </Button>
                        </Box>          
                    </Grid>
                    <Grid item container justify="center" spacing={5}>
                        {ingredientsList!=undefined && ingredientsList.map((item,index)  => (   
                        <Grid item>
                            <RefrigeratorItem
                                index={index}
                                handleSelectedIngredients={handleSelectedIngredients}
                                name={item.strIngredient as string}
                                type={item.strType as string}
                                alcohol={item.strAlcohol as string}  
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


