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

import { NavLink } from 'react-router-dom';

import MyPageRoutes from '../../../../pages/route';

const drawerWidth = 240;



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
    const classes = useStyles();
    
    return(
      <div className={classes.toolbar}>
        <List>
          {MyPageRoutes.map((route) => (
            <NavLink
              to={"/mypage"+route.path}
              key={"/mypage"+route.path}
              style={{ textDecoration: 'none' }}
            >
              <ListItem
                key={route.name}
                className={classes.leftListItems}
                disableGutters
                button
              >
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
                {route.name}
              </ListItem>
              <Divider/>
            </NavLink>
          ))}
        </List>
    </div>
  );
}