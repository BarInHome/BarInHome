import React from 'react';

import AuthComponent from '../components/door/auth/AuthComponent';
import RecommandComponent from '../components/door/recommend/RecommandComponent';


function Door(): JSX.Element {

    return(
        <div>
            <AuthComponent/>
            <RecommandComponent/>
        </div>
    );
}

export default Door;