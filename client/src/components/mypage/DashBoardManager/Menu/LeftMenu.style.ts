import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const leftMenuStyle = makeStyles((theme: Theme) =>
  createStyles({
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