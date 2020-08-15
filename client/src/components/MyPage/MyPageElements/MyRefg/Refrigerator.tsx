import React,{useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Typography,Box,Grid,Paper,Button} from '@material-ui/core';
import RefrigeratorBoard from './RefrigeratorBoard';
import useDialog from '../../../../utils/hooks/useDialog';
import RefrigeratorDialog from '../../../Dialogs/RefrigeratorDialog'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop:"25px",
  },
  refg: {
      height: "auto",
      minHeight:"200px",
      minWidth: "600px",
      border:"solid",
      borderRadius: "15px",
      borderColor: theme.palette.primary.main,
      justifyContent:"center",
  },
  title: {
      marginBottom: "30px",
      borderRadius: "5px",
      border: "solid"
  },
  tab: {
    minWidth: 200, // a number of your choice
    width: "auto", // a number of your choice  
    borderRadius: "5px",
    background: theme.palette.primary.main,
    color: "white",
  },
  tabPanel: {
    justifyContent:"center",
  },
  tabLabel: {
    borderRadius: "15px",
    background:"white",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


export default function Refrigerator() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {open,handleOpen,handleClose} = useDialog();
  const [ingredienttype, setIngredienttype] = React.useState<string>('');
  const [ingredient, setIngredient] = React.useState<string>('');
  
  // const types = ['whine','whiskey','rum']
  // const ingredients = ['bacadi','lehendario','what','blad']

  // const handleChangeSelect1 = (event: React.ChangeEvent<{value: unknown}>) => {
  //   setIngredienttype(String(event.target.value) || ''); 
  // //타입선택하면 서버로 타입값 넘기고 타입에 해당하는 술종류들 불러온다
  // };
  // const handleChangeSelect2 = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setIngredient(String(event.target.value) || '');
  // //술종류들 불러온 것중에 고르게된다
  // //술종류 선택하면 state 변경
  // };
  const handleClickOpen = () => {
    handleOpen();
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  

  return (
    <div className={classes.root}>
      <RefrigeratorDialog
      open = {open}
      handleClose = {handleClose}
      setIngredienttype = {setIngredienttype}
      setIngredient = {setIngredient}
      ingredient = {ingredient}
      ingredienttype = {ingredienttype}>
      </RefrigeratorDialog>
      <Paper elevation={3}>
      <Grid container 
            style={{padding:"30px"}}
            direction="column"
            justify="center"
            alignItems="center"
           >
            <Grid container direction="row"  justify="space-evenly"
            alignItems="center">
              <Grid item>
                <AppBar position="static" className={classes.tabLabel}>
                    <Tabs
                      centered
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example">
                    <Tab label="Drink" className={classes.tab} {...a11yProps(0)} />
                    <Tab label="Others" className={classes.tab} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>
                    새로운 재료 등록
                </Button> 
              </Grid>
            </Grid>
            
            <Grid container item xs={12} className={classes.refg}>
                <TabPanel value={value} index={0}>
                  <RefrigeratorBoard/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Empty
                </TabPanel>
            </Grid>
        </Grid>
      </Paper>
      
        
    </div>
  );
}
