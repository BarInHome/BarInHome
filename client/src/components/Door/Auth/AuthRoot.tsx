
import React from 'react';
import {authReducer,initialState} from './Auth.reducer';

import Login from './Login';

function AuthRoot():JSX.Element{
    const [isLoginPage , setIsLoginPage] = React.useState(true);
    const [state , dispatch] = React.useReducer(authReducer,initialState); 

    function handleSetIsLogin(pageNum : boolean){
        setIsLoginPage(pageNum);
    };

    return( 
        <>
            <Login
                handleSetIsLogin={handleSetIsLogin}
                state={state}
                dispatch={dispatch}
            />
        </>
    );
}

export default AuthRoot;