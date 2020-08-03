import React from 'react';
import AuthComponent from '../components/Auth/AuthComponent';

interface userSessionInterface{
    handleLoginInfo: (state: boolean) => void;
}

function Auth():JSX.Element{
    
    return(
       <div>
           <AuthComponent/>
       </div>
    );
}

export default Auth;