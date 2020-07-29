import React from 'react';
import Auth from './Auth';
import Recommed from './Recommend';

// hooks
import {useLoginValue} from '../utils';

function Main():JSX.Element{
    const {isLogin,setIsLogin} = useLoginValue();
    
    const handleLoginInfo=(state:boolean)=>{
        setIsLogin(state);
    }

    React.useEffect(()=>{
        console.log("isLogin",isLogin);
    },[isLogin])

    return(
        <div>
            {isLogin?(
                <Recommed/>
            ):(
                <Auth handleLoginInfo={handleLoginInfo}/>
            )}
        </div>
    );
}

export default Main;