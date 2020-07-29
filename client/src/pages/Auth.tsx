import React from 'react';
import {Login,Signup} from '../components'
import { Route,Switch } from 'react-router-dom';
import styled from 'styled-components';


function Auth():JSX.Element{
    return(
       <div>
           <Route exact path='/' component={Login}/>
           <Route exact path='/auth/signup' component={Signup}/> 
       </div>
    );
}

export default Auth;