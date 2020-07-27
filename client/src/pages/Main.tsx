import React from 'react';
import Door from './Door';
import Recommed from './Recommend';

// hooks
import {useLoginValue} from '../utils';

function Main():JSX.Element{
    const {isLogin} = useLoginValue();

    return(
        <div>
           {!isLogin?(
               <Door/>
           ):(
               <Recommed/>
           )}
        </div>
    );
}

export default Main;