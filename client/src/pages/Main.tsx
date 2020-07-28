import React from 'react';
import Auth from './Auth';
import Recommed from './Recommend';
import styled from 'styled-components';

// hooks
import {useLoginValue} from '../utils';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  display: flex;
  justify-content:center;
  text-align:center;    
`;  


function Main():JSX.Element{
    const {isLogin} = useLoginValue();

    return(
        <Wrapper>
           {!isLogin?(
               <Auth/>
           ):(
               <Recommed/>
           )}
        </Wrapper>
    );
}

export default Main;