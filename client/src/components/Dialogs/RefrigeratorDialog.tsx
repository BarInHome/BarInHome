import React,{useEffect} from 'react';
import ingredientData from '../MyPage/MyPageElements/MyRefg/ingredientData.json';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Button,Dialog,DialogTitle,DialogActions,DialogContent,
        FormControl,Select,Input,InputLabel,MenuItem} from '@material-ui/core';
import usePostRequest from '../../utils/hooks/usePostRequest';
// interface RefrigeratorInterface{
//     open:boolean;
//     handleClose:()=>void;
//     handleOpen:()=>void;
//     setIngredienttype:React.Dispatch<React.SetStateAction<string>>;
//     setIngredient:React.Dispatch<React.SetStateAction<string>>;
//     ingredient:string;
//     ingredienttype:string;
// }
interface ingredientinterface{
  ingredient:string;
  ingredienttype:string;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function RefrigeratorDialog(props:any) {
    const {open,handleClose,setIngredienttype,setIngredient,ingredient,ingredienttype}=props;
    const classes = useStyles();
    const [ingredients, setIngredients] = React.useState<string[]>(['']);
    const {doPostRequest} = usePostRequest<ingredientinterface,boolean>('/refrigerator/insert',()=>{
      console.log('[insert success]');
    }) 
    
    const handleChangeSelect1 = (event: React.ChangeEvent<{value: unknown}>) => {
      setIngredienttype(String(event.target.value) || ''); 
    };
    const handleChangeSelect2 = (event: React.ChangeEvent<{ value: unknown }>) => {
      setIngredient(String(event.target.value) || '');
    };
    const handleInsert = () => {
      doPostRequest({
        ingredient:ingredient,
        ingredienttype:ingredienttype
      });
      handleClose();
    };

    useEffect(() => {
      setIngredients([]);
      console.log("ingredienttype: "+ingredienttype);
      
      let ingredientList:string[] = []
      for(let element of ingredientData){
        if(ingredienttype==element.strType){  
          console.log(element.strIngredient)
          ingredientList.push(element.strIngredient);
        }
      }
      console.log(ingredientList); 
      setIngredients(ingredientList);
    },[ingredienttype]);

    let typesset = new Set<string>();
    for(let element of ingredientData)
        if(element.strType!=null)
            typesset.add(element.strType);
    const typearray:string[] = [...Array.from(typesset)];
    const typeList = typearray.map(type => <MenuItem value={type}>{type}</MenuItem>);
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"새로운 재료"}</DialogTitle>
            <DialogContent>
                <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">재료타입</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={ingredienttype}
                            onChange={handleChangeSelect1}
                            input={<Input />}
                        >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {typeList}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">재료</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={ingredient}
                            onChange={handleChangeSelect2}
                            input={<Input />}
                        >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {ingredients.map((ingredientsList,index)=>{
                          return (<MenuItem value={ingredientsList} key={index}>{ingredientsList}</MenuItem>)
                        })}
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleInsert} color="primary">
                    추가
                </Button>
                <Button autoFocus onClick={handleClose} color="primary">
                    닫기
                </Button>
            </DialogActions> 
        </Dialog>
    );
}