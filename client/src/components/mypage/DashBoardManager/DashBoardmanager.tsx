import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import {UseGetRequestObject} from '../../../utils/hooks/useGetRequest';
import LeftMenuDrawer from './Menu/LeftMenuDrawer';
import MyRefrigerator from '../DashBoardContents/MyRefrigerator/RefrigeratorBoard';
import UserInformation from '../DashBoardContents/UserInformation/MyInfo';
import useGetRequest from '../../../utils/hooks/useGetRequest';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'normal',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      borderRadius:"5px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
       width: drawerWidth,
       borderRadius:"5px"
    },
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(5),
    },
    leftListItems: {
        height: "100px",
    },
    leftListItemsIcons: {
        height: "100px",
    }
  }),
);

export default function MyPage() {
  const classes = useStyles();
  /*    Page Selector
       0 : 내 냉장고
       1 : 내 정보
       2 : 추후 추가
  */
  
  const [menuIndex, setMenuIndex] = React.useState(0);
  const handleSetMenuIndex = (index:number) => {
      setMenuIndex(index);
  }
  const ContentsArray = [<MyRefrigerator/>,<UserInformation/>,<div>3</div>,<div>4</div>];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <LeftMenuDrawer handleSetMenuIndex={handleSetMenuIndex} menuIndex={menuIndex}/>    
      </nav>
      <main className={classes.content}>
        {ContentsArray[menuIndex]}
      </main>
    </div>
  );
}
