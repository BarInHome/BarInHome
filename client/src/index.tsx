import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';

// pages
import Door from './pages/Door';
import Main from './pages/Main';


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Door}/>
      <Route exact path='/main' component={Main}/>
      <Route exact path='/myrefigerator' component={Main}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
