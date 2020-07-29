import React from 'react';
import Auth from './Auth';
import Recommed from './Recommend';
import Header from '../components/Main/Header';

// hooks
import {useLoginValue} from '../utils';

function Main():JSX.Element{
    const {isLogin} = useLoginValue();

    return(
        <div>
            {!isLogin?(
                <Auth/>
            ):(
                <Recommed/>
            )}
        </div>
    );
}

export default Main;