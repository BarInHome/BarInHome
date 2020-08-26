import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import { CookiesProvider } from 'react-cookie';


// styled-components
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import {AppBar, Typography} from '@material-ui/core';


// pages
import {
  Door, Main, Mypage
} from './pages';


ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <GlobalStyles/> 
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Typography variant="h3">
              Test Header
            </Typography>
          </AppBar>
          <Switch>
            <Route exact path='/' component={Door}/>
            <Route exact path='/main' component={Main}/>
            <Route exact path='/mypage' component={Mypage}/>
          </Switch>
          
        </ThemeProvider>
      </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
