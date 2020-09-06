import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Switch, Route, Redirect,Router } from 'react-router-dom';

// styled-components
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Header from './components/header/Header';

// pages
import {
  Door, Main, Mypage
} from './pages';

ReactDOM.render(
    <BrowserRouter>
      <GlobalStyles/> 
        <ThemeProvider theme={theme}>
        <Header/>
          <Switch>
            <Route exact path='/' component={Door}/>
            <Route path='/main' component={Main}/>
            <Route exact path='/mypage' component={Mypage}/>
          </Switch>
        </ThemeProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
