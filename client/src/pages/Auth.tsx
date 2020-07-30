import React from 'react';
import {Login,Signup} from '../components'
import { Route,Switch } from 'react-router-dom';
import styled from 'styled-components';

interface userSessionInterface{
    handleLoginInfo: (state: boolean) => void;
}
//props:userSessionInterface
// handleLoginInfo={handleLoginInfo}
function Auth():JSX.Element{
    //const {handleLoginInfo} = props;
    return(
       <div>
           <Login></Login>
       </div>
    );
}

export default Auth;