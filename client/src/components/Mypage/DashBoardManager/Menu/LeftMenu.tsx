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
import {AccountBox,MoveToInbox,Description,Instagram} from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
       borderRadius:"5px",
       
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    leftListItems: {
        height: "150px",
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent:'center',
    },
    leftListItemsIcons: {
        height: "100px",
    },
    itemAlign: {
        justifyContent: "center"
    },
    active: {
      backgroundColor: theme.palette.primary.dark,
    }
  }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    handleSetMenuIndex : (index:number) => void;
    menuIndex: number;
}

export default function LeftMenu(props:Props): JSX.Element {
    const { handleSetMenuIndex ,menuIndex} = props;
    const classes = useStyles();
    const onClick = (index:number) =>{
        handleSetMenuIndex(index);
    }

    const IconArray = [ <MoveToInbox fontSize="large"/>,<AccountBox fontSize="large"/>,
                        <Instagram fontSize="large"/>, ]

    return(
      <div className={classes.toolbar}>
        <List className={classes.itemAlign}>
            {['내 냉장고','나의 정보','기타'].map((text, index) => (
            <>
                <ListItem 
                    button key={text}
                    selected={menuIndex === index?true:false}
                    className={classes.leftListItems}
                    onClick={() => onClick(index)} 
                >
                    <ListItemIcon>
                        {IconArray[index]}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
                <Divider/>
            </>
            ))}
        </List>
    </div>
    );
}