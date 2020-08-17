
import React from 'react';
import {authReducer,initialState} from './Auth.reducer';
import Login from './Login';

function AuthComponent():JSX.Element{
    const [isLoginPage , setIsLoginPage] = React.useState(true);
    const [state , dispatch] = React.useReducer(authReducer,initialState); 

    function handleSetIsLogin(pageNum : boolean){
        setIsLoginPage(pageNum);
    };

    return( 
        <div>
            <Login
                handleSetIsLogin={handleSetIsLogin}
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
}

export default AuthComponent;