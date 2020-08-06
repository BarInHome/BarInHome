import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RefrigeratorBoard from './RefrigeratorBoard';
import Button from '@material-ui/core/Button';
import { Toolbar } from 'material-ui';

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
  }
}));

export default function Refrigerator() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
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
                <Button variant="contained" size="large" color="primary">
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
