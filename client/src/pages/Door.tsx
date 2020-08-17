import React from 'react';

import AuthComponent from '../components/Door/Auth/AuthComponent';
import RecommandComponent from '../components/Door/Recommand/RecommandComponent';


function Door(): JSX.Element {

    return(
        <div>
            <AuthComponent/>
            <RecommandComponent/>
        </div>
    );
}

export default Door;