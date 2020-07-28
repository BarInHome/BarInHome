import React from 'react';
import axios from '../axios';


const useLoginValue = () :{
    isLogin : boolean;
} => {
    const [isLogin,setIsLogin] = React.useState<boolean>(false);

    axios.get<boolean>('auth/login/check')
    .then((res) => {
      if (!res.data) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    return {isLogin};
}

export default useLoginValue;