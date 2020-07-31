
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import useInputChange from '../../../utils/hooks/useInputChange';
import usePostRequest from '../../../utils/hooks/usePostRequest';
import useGetRequest from '../../../utils/hooks/useGetRequest';

import history from '../.././../history';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: 'parent', // Fix IE 11 issue.
    height:'parent',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitAPI: {
    margin: theme.spacing(3, 0, 2),
    width: "45%",
  },
  buttonWrapper: {
    justifyContent: "space-between"
  }
}));


interface userInterface{
  name?:string;
  id:string;
  pw:string;
}

interface userSessionInterface{
  handleLoginInfo: (state: boolean) => void;
}
//props:userSessionInterface
export default function Login() {
  //const {handleLoginInfo} = props;

  const classes = useStyles();
  const handleID = useInputChange();
  const handlePW = useInputChange();
  const {doPostRequest} = usePostRequest<userInterface,boolean>('/auth/login',()=>{
      console.log('[login success]');
      //handleLoginInfo(true);
      history.push('/main');
      window.location.reload();
  });

  const onClickLogin = () => {
      try{
          doPostRequest({
            id:handleID.value,
            pw:handlePW.value
          });
      }catch(e){
          console.log(e);
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate></form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={handleID.value}
            onChange={handleID.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password" 
            value={handlePW.value}
            onChange={handlePW.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickLogin}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Grid container className={classes.buttonWrapper} >
        
              <Button
              type="submit"
              className={classes.submitAPI}
              variant="contained" 
              color="primary"
              href="http://localhost:5000/auth/login/facebook" 
              >
              Facebook
              </Button>
  
              <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onClickLogin}
              className={classes.submitAPI}
            >
              Google
            </Button>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


/* 
import React from 'react'
import {Link} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../../styles/theme';
import InputWithLabel from '../Styels/InputWithLabel';

import useInputChange from '../../../utils/hooks/useInputChange';
import usePostRequest from '../../../utils/hooks/usePostRequest';
// 실제 로그인 수행
// Hooks 통한 서버인증 수행부

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledTextField = styled(TextField)`
 
  .MuiInput-underline:before {
    border-bottom: 2px solid ${oc.orange[1]};
  }
  
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid ${oc.orange[1]};
  }
  
  .MuiInput-underline:after {
    border-bottom: 2px solid ${oc.orange[1]};
  }
`;


function Login():JSX.Element{
    const handleID = useInputChange();
    const handlePW = useInputChange();
    const {doPostRequest} = usePostRequest<string[],boolean>('/auth/login');

    const onClickLogin = () => {
        try{
            doPostRequest([handleID.value,handlePW.value]);
        }catch(e){
            console.log(e);
        }
    }

    return(
        <Wrapper>
            <StyledTextField 
                margin="normal"
                type="text"
                name="id"
                label="ID"
                size="medium"
                value={handleID.value}
                onChange={handleID.handleChange}
                placeholder="ID"/>
            
            <StyledTextField 
                type="password"
                margin="normal" 
                name="pw"
                label="Password"
                size="medium"
                value={handlePW.value}
                onChange={handlePW.handleChange}
                placeholder="PW"/>
            
            <Button
                variant="contained" 
                color="inherit"
                onClick={onClickLogin}>
                    Login
            </Button>

        </Wrapper>
    );
}

export default Login; */