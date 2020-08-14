import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Typography,Box,Grid,Paper,Button,
        Dialog,DialogTitle,DialogActions,DialogContent,
        FormControl,Select,Input,InputLabel,MenuItem} from '@material-ui/core';
import RefrigeratorBoard from './RefrigeratorBoard';

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
  const [open, setOpen] = React.useState(false);
  const [ingredienttype, setIngredienttype] = React.useState<string>('');
  const [ingredient, setIngredient] = React.useState<string>('');

  const types = ['jin','sugar','lime'];
  const typeList = types.map((types:string)=><MenuItem value={types}>{types}</MenuItem>);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  //타입은 db정리 한 번해야하니까 우선 보이는 타입 몇개 긁어서 변수 types에 박는다
  const handleChangeType = (event: React.ChangeEvent<{value: unknown}>) => {
    setIngredienttype(String(event.target.value) || ''); 
    //타입선택하면 서버로 타입값 넘기고 타입에 해당하는 술종류들 불러온다
  };
  const handleChangeIngredient = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIngredienttype(String(event.target.value) || '');
    //타입을 넘겨서 서버로부터 받은 술종류들을 위에서 술종류들 불러온걸로 고르게된다
    //술종류 선택하면 state 변경
  };
  const handleInsert = () => {
    //닫기 누르게 된다면 술종류 서버로부터 넘기고 서버에서 디비에 값 박는거 구현한다
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"새로운 재료"}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">재료종류</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={ingredienttype}
                onChange={handleChangeType}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {typeList}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions> 
      </Dialog>
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
