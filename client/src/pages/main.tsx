import React from 'react';
import Header from '../components/main/Header'; 
import CocktailIndex from '../components/main/Cocktailindex';
import { withRouter, useHistory } from 'react-router-dom';
import { useSampleState, useSampleDispatch } from '../modules/globalContext';
import Dispatch from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'react-cookies';

const Main: React.FunctionComponent = ({children}) => {
    const history = useHistory();

    React.useEffect(() => {
        // 페이지 리로딩 -> 쿠키 검사 수행 로직
        if(!cookie.load('access_token')){
            history.replace('/');
        }
        console.log('[access_token Exist ... ]');
    },[]);

    return(
        <div style={{ marginTop: 5, padding: 20 }}>
            {/* <Header></Header> */}
            <CocktailIndex></CocktailIndex>
        </div>
    );
}

export default withRouter(Main);
