import { fade,makeStyles, Theme,createStyles } from '@material-ui/core/styles';

const AddDialogStyle = makeStyles((theme: Theme) => 
    createStyles({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        maxWidth: 360,
    },
    grow: {
        flexGrow: 1,
    },
    dialogWrapper: {
        minHeight: '300px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    addButton: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        maxWidth: 360,
        background: theme.palette.secondary.main,
        fontWeight: 'bold'
    },
    initButton: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        maxWidth: 360,
        background: theme.palette.primary.dark,
        fontWeight: 'bold'
    },
}));

export default AddDialogStyle;