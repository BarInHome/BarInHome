import React from 'react';
import Header from '../components/main/Header'; 
import CocktailRecIngre from '../components/main/CocktailRecIngre';
import { withRouter } from 'react-router-dom';

function Main(): JSX.Element {

    return(
        <div style={{ marginTop: 5, padding: 20 }}>
            {/* <Header></Header> */}
            <CocktailRecIngre></CocktailRecIngre>
        </div>
    );
}

export default withRouter(Main);
