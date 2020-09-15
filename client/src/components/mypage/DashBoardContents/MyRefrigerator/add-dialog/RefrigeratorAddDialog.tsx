import React from 'react';
import {Button,DialogContent,Grid,Dialog,
        FormControl,Select,Input,InputBase,InputLabel,MenuItem,AppBar
        ,Toolbar,IconButton,Box,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {typeList, alcoholList} from '../constant/index';
import AddDialogItems from './AddDialogItems'
import usePostRequest from '../../../../../utils/hooks/usePostRequest';
// style
import AddDialogStyle from './RefrigeratorAddDialog.style';
// interface
import { DialogProps, IngredientFilter, Ingredient } from '../MyRerigerator.interface';


function RefrigeratorAddDialog(props:DialogProps):JSX.Element{
    const {
        open, handleClose ,request,
    } = props;
    const classes = AddDialogStyle();    
    const [ingredientsList, setIngredientsList] = React.useState<Ingredient[]>();
    const [selectedType , setSelectedType ] =  React.useState<string>('');
    const [selectedAlchol , setSelectedAlchol ] =  React.useState<string>('');     
    const {data, doPostRequest} = usePostRequest<IngredientFilter,Ingredient[]>('/mypage/refrigerator/search');
    const selectedIngredients:Ingredient[] = [];
    const addRequest = usePostRequest('/mypage/refrigerator/add',() => {
        request();
    });
    
    React.useEffect(() => {
        if(selectedType !== undefined && selectedAlchol !== undefined){
            doPostRequest({
                strType: selectedType,
                strAlcohol: selectedAlchol
            });
        }
    },[selectedType, selectedAlchol, doPostRequest]);

    React.useEffect(() => {
        if(data)
            setIngredientsList(data);
    },[data]);

    // 선택된 재료들을 다시 눌렀을때 발생하는 로직 정의
    const handleSelectedIngredients = (index: number, PushOrPop: boolean) => {
        if(PushOrPop){
            if(ingredientsList !== undefined)
                selectedIngredients.push(ingredientsList[index]);
            console.log('selectedIngredients PUSH',selectedIngredients);
        }
        else if(ingredientsList){
            selectedIngredients.splice(selectedIngredients.indexOf(ingredientsList[index]),1);
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

    const handleInitButton = () => {
        setSelectedType('');
        setSelectedAlchol('');
        setIngredientsList([]);
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
                            <Button variant="contained" color="primary">
                                검색하기
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
                            {alcoholList.map((alcoholList,index)=>{
                            return (<MenuItem value={alcoholList} key={index}>{alcoholList}</MenuItem>)
                            })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} >
                        <Box mt={2} ml={5}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                className={classes.addButton} 
                                onClick={handleAddButton}
                            >
                                    추가하기    
                            </Button>
                        </Box>          
                    </Grid>
                    <Grid item xs={2} >
                        <Box mt={2} ml={5}>
                            <Button variant="contained" color="secondary" className={classes.initButton} onClick={handleInitButton}>
                                    초기화    
                            </Button>
                        </Box>          
                    </Grid>
                    <Grid item container justify="center" spacing={5}>
                        {ingredientsList && ingredientsList.map((item,index)  => (   
                        <Grid item>
                            <AddDialogItems
                                index={index}
                                handleSelectedIngredients={handleSelectedIngredients}
                                name={item.strIngredient as string}
                                type={item.strType as string}
                                alcohol={item.strAlcohol as string}
                                abv={item.strABV as string}
                            />
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            </DialogContent>
       </Dialog>
    );
}
export default RefrigeratorAddDialog;