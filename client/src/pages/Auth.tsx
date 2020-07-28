import React from 'react';
import {Login,Signup} from '../components'
import styled from 'styled-components';
import {Typography} from '@material-ui/core';   

import AuthWrapper from '../components/Auth/Styels/AuthWrapper';

const Wrapper = styled.section`
  padding: 4em;
  background: tomato;
  margin: 30px;
  max-width: 400px;
  align-items: center;  
  text-align:center;
  justification:center; 
  border: 2px solid tomato;
  border-radius: 5px;
`;

function Auth():JSX.Element{
    return(
        <div>
            <Typography variant="h2">
                Auth Page
            </Typography>
            {AuthWrapper(Login)}
        </div>
    );
}

export default Auth;