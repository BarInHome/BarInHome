import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

// styled-components
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
// pages
//import Auth from './pages/Auth';  // 사용자 인증 안되어 있을시 - 로그인 페이지 + 회원가입 페이지 링크
import Main from './pages/Main';  // 추천 칵테일 페이지 + 내 냉장고 페이지 링크
import Myrefg from './pages/Myrefg';
import Recommend from './pages/Recommend';
import Auth from './pages/Auth';
import Signup from './components/Auth/Signup/Signup';
import Header from './components/Main/Header';


ReactDOM.render(
  <Router history={history}>
    <GlobalStyles/>
    <ThemeProvider theme={theme}>
      <Header/>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/recom' component={Recommend}/>
        <Route exact path='/myrefg' component={Myrefg}/>  
        <Route exact path='/auth/signup' component={Signup}/> 
      </Switch>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
