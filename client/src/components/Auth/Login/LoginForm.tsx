import React from 'react'
import {Link} from 'react-router-dom';
import {Button,TextField} from '@material-ui/core';
import styled from 'styled-components';

import useInputChange from '../../../utils/hooks/useInputChange';
import usePostRequest from '../../../utils/hooks/usePostRequest';
// 실제 로그인 수행
// Hooks 통한 서버인증 수행부

function LoginForm():JSX.Element{
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
        <div>
            <TextField 
                margin="normal"
                type="text"
                name="id"
                size="medium"
                value={handleID.value}
                onChange={handleID.handleChange}
                placeholder="ID"/>
            
            <TextField 
                type="password"
                margin="normal" 
                name="pw"
                size="medium"
                value={handleID.value}
                onChange={handlePW.handleChange}
                placeholder="PW"/>
            
            <Button
                variant="contained" 
                color="inherit"
                onClick={onClickLogin}>
                    Login
            </Button>

        </div>
    );
}

export default LoginForm;