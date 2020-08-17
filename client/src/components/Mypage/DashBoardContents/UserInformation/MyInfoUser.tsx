import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
//import ChangeUserInfoDialog from '../../../Dialogs/ChangeUserInfoDialog';

import useDialog from '../../../../utils/hooks/useDialog';
import usePostRequest from '../../../../utils/hooks/usePostRequest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "30px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      minHeight: '400px',
    },
    title: {
      marginTop: "10px",
    },
    divider: {
        marginTop: "10px",
        color : theme.palette.primary.dark,
    },
    inputBox: {
      width:"120px",
    }
  }),
);

/*
  post Data format
  data : {
    id : string
    name : string
    email : string
  }
*/

interface userInterface{
  name:string;
  id:string;
  email:string
  pw?:string;
}

export default function MyInfoUser(): JSX.Element {
    const classes = useStyles();
    const {open,handleOpen,handleClose} = useDialog();
    const defaultInfo = {
      name : "김법우",
      email : "qjqdn1568@naver.com",
      id : "qjqdn1568"
    }
    const {loading, data, doPostRequest} = usePostRequest<void,userInterface>('/auth/info');

    React.useEffect(()=>{
      doPostRequest();
      console.log("dfdf")
    },[doPostRequest])

    return(
          <Grid item xs={6} >
            <Paper 
              className={classes.paper}
              elevation={4}
            >
              {!loading && data ?(
                <Grid container direction= "column" spacing={3}>
                   <Grid item>
                    <Typography variant="h5" >
                        회원 정보 
                    </Typography>
                    <Divider 
                      className={classes.divider}
                    />
                   </Grid>
                   <Grid item>
                       <TextField
                        label="이름"
                        value={data.name}
                        variant="outlined">

                       </TextField>
                   </Grid>
                   <Grid item>
                       <TextField
                        label="이메일"
                        value={data.email}
                        variant="outlined">

                       </TextField>
                   </Grid>
                   <Grid item>
                       <TextField
                        label="ID"
                        value={data.id}
                        variant="outlined">

                       </TextField>
                   </Grid>
                   <Grid item xs={12} justify="flex-end">
                    <Button 
                      variant="contained" color="primary"
                      onClick={()=>handleOpen()}>
                        수정하기
                    </Button>
                   </Grid>
                </Grid>
              ):(
                <Typography>
                  Loading...
                </Typography>
              )
              }
                
            </Paper>
            
          </Grid>
    );
}