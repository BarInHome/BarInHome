import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import RefrigeratorBoard from './RefrigeratorBoard';
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
    marginTop:"15px",
  },
  refg: {
      height: "auto",
      minHeight:"200px",
      width: "1200px",
      border:"solid",
      borderColor: theme.palette.primary.main,
      justifyContent:"center",
  },
  title: {
      marginBottom: "15px",
  },
  tab: {
    minWidth: 200, // a number of your choice
    width: "auto", // a number of your choice  
  },
  tabPanel: {
    justifyContent:"center",
  },

}));

export default function Refrigerator() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
        <Grid container 
            direction="column"
            justify="center"
            alignItems="center">
            <Typography component="h1" variant="h5" className={classes.title}>
                내 냉장고
            </Typography>
            <Grid>
              <AppBar position="static" >
                  <Tabs 
                    value={value}
                    onChange={handleChange} 
                    aria-label="simple tabs example">
                   <Tab label="Drink" className={classes.tab} {...a11yProps(0)} />
                   <Tab label="Fruits" className={classes.tab} {...a11yProps(1)} />
                   <Tab label="Others" className={classes.tab} {...a11yProps(2)} />
                  </Tabs>   
              </AppBar>
            </Grid>
            
            <Grid container item xs={12} className={classes.refg}>
                <TabPanel value={value} index={0}>
                  <RefrigeratorBoard/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <RefrigeratorBoard/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <RefrigeratorBoard/>
                </TabPanel>
            </Grid>
        </Grid>
    </div>
  );
}
