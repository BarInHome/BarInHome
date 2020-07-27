import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

// pages
import Door from './pages/Door';  // 사용자 인증 안되어 있을시 - 로그인 페이지 + 회원가입 페이지 링크
import Main from './pages/Main';  // 추천 칵테일 페이지 + 내 냉장고 페이지 링크
import Myrefg from './pages/Myrefg';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route exact path='/myrefg' component={Myrefg}/>  
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
