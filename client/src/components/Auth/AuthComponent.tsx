
import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import {authReducer,initialState} from './Auth.reducer';

function Auth():JSX.Element{
    const [isLoginPage , setIsLoginPage] = React.useState(true);
    const [state , dispatch] = React.useReducer(authReducer,initialState); 

    function handleSetIsLogin(pageNum : boolean){
        setIsLoginPage(pageNum);
    };

    return( 
       <div>
           {isLoginPage?(
               <Login
                 handleSetIsLogin={handleSetIsLogin}
                 state={state}
                 dispatch={dispatch}
                />
           ):(
                <Signup
                 handleSetIsLogin={handleSetIsLogin}
                 state={state}
                 dispatch={dispatch}
                />
           )}
       </div>
    );
}

export default Auth;