import React from 'react';
import axios from '../axios';


const useLoginValue = () :{
    isLogin : boolean;
    setIsLogin:React.Dispatch<React.SetStateAction<boolean>>;
    check: () => void;
} => {
    const [isLogin,setIsLogin] = React.useState<boolean>(false);
    
    const check = React.useCallback(()=>{
      axios.get<boolean>('auth/login/check')
      .then((res) => {
        if (res.data) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },[setIsLogin])
    
    return {isLogin,setIsLogin,check};
}

export default useLoginValue;


/*
const check = React.useCallback(()=>axios.get<boolean>('auth/login/check')
      .then((res) => {
        if (res.data) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })};
    )
*/
