import React from 'react';
import {Login,Signup} from '../components'
import { Route,Switch } from 'react-router-dom';
import styled from 'styled-components';

interface userSessionInterface{
    handleLoginInfo: (state: boolean) => void;
}

function Auth(props:userSessionInterface):JSX.Element{
    const {handleLoginInfo} = props;
    return(
       <div>
           <Route exact path='/' 
                render={()=><Login handleLoginInfo={handleLoginInfo}/>}/>
           <Route exact path='/auth/signup' component={Signup}/> 
       </div>
    );
}

export default Auth;