import React from 'react';
import Header from '../components/main/Header'; 
import CocktailRecIngre from '../components/main/CocktailRecIngre';


function Main(): JSX.Element {

    return(
        <div style={{ marginTop: 5, padding: 20 }}>
            {/* <Header></Header> */}
            <CocktailRecIngre></CocktailRecIngre>
        </div>
    );
}

export default Main;
