import React from 'react';
import {ListItem,ListItemText,Divider,List,Typography,TextField,Input,InputLabel,InputAdornment,
        IconButton} from '@material-ui/core';
import { createStyles, makeStyles,Theme } from '@material-ui/core/styles';
import usePostRequest from '../../utils/hooks/usePostRequest'
import AddCommentIcon from '@material-ui/icons/AddComment';

interface CommentProps{
    open: boolean;
    cocktailname: string|null;
    defaultInfo?: any;
}
interface Intercomment{
    user?:string
    comment:string;
    cocktailname?:string;
}
interface State {
    comment: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
  }),
);
//넘겨주어야한다
function Dialogcomment(props:CommentProps):JSX.Element {
    const {open,cocktailname}=props;
    const classes = useStyles();
    const [usercomments, setusercomments] = React.useState<Intercomment[] | null>([]);
    // const [comment, setcomment] = React.useState<string | null>('');
    const [values, setValues] = React.useState<State>({comment: '',
    });
    const {data:commentdata, doPostRequest:commentRequest} = usePostRequest<{cocktailname:string|null},Intercomment[]>('/main/comment',() => {
        console.log("request !");
    });
    const {data:check, doPostRequest:insertRequest} = usePostRequest<Intercomment,boolean>('/main/comment/insert',() => {
        console.log("request !");
    });
    //open 되면
    React.useEffect(() => {
        console.log("cocktailname in comment ",cocktailname);
        commentRequest({
            cocktailname:cocktailname,
        });
    },[open===true && cocktailname!=null]);
    
    React.useEffect(()=>{
        setusercomments(commentdata);
    },[commentdata])

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleInsertcomment = () => {
        insertRequest({
            comment:values.comment,
            cocktailname:cocktailname
        }as Intercomment)
        //이제 코멘트 보내고 그리고 다시 코멘트 값 초기화
        setValues({comment:''});
        commentRequest({
            cocktailname:cocktailname,
        });
    };
    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return(
        <List className={classes.root}>
            {usercomments!=undefined && usercomments.map((unicomment,index)=>(
                <>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={unicomment.user}
                            secondary={
                                <React.Fragment>
                                    {/* <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography> */}
                                    {unicomment.comment}
                                </React.Fragment>
                        }
                        />
                    </ListItem>
                    {index < usercomments.length-1 ?<Divider variant="inset" component="li" />:<></>}
                </>
            ))}
            <InputLabel htmlFor="standard-adornment-comment">Comment</InputLabel>
            <Input
                id="standard-adornment-comment"
                value={values.comment}
                onChange={handleChange('comment')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleInsertcomment}
                            onMouseDown={handleMouseDown}
                        >
                        <AddCommentIcon/>
                      </IconButton>    
                    </InputAdornment>
                }
                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            {/* <ListItem alignItems="flex-start">
                <TextField
                    id="standard-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                />
            </ListItem> */}
        </List>
    );
}
export default Dialogcomment;