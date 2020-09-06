import React from 'react';
import Header from '../components/main/Header'; 
import Cocktailindex from '../components/main/Cocktailindex';
import { withRouter } from 'react-router-dom';

function Main(): JSX.Element {

    return(
        <div style={{ marginTop: 5, padding: 20 }}>
            {/* <Header></Header> */}
            <Cocktailindex></Cocktailindex>
        </div>
    );
}

export default withRouter(Main);
