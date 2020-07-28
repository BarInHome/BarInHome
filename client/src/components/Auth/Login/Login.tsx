import React from 'react';
import styled from 'styled-components';

// style 배경 설정 , bar 설정
import LoginForm from './LoginForm';

const Button = styled.button`
  color: white;
  background-color:tomato;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid tomato;
  border-radius: 3px;
`;


function Login():JSX.Element{
    
    return(
        <div>
            Login page
            <LoginForm/>
        </div>
    );
}

export default Login;