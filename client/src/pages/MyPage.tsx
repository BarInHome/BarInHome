import React from 'react';
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

import LeftMenuDrawer from '../components/MyPage/LeftMenu/LeftMenuDrawer';
import Refrigerator from '../components/MyPage/MyPageElements/MyRefg/Refrigerator';
import MyInfo from '../components/MyPage/MyPageElements/MyInfo/MyInfo';
import APITest from '../components/MyPage/Others/APITest';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'normal'
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
      padding: theme.spacing(3),
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
        0 : 회원정보관리
        1 : 내 냉장고
        2 : 내 레시피
        3 : 기타 사항
  */
  const [menuIndex, setMenuIndex] = React.useState(0);
  const handleSetMenuIndex = (index:number) => {
      setMenuIndex(index);
  }
  const ContentsArray = [<MyInfo/>,<Refrigerator/>,
                         <div>2</div>,<APITest/>];

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
