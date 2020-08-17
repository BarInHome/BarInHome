import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import history from './history';

// styled-components
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';

// pages
import {
  Door, Main, Mypage
} from './pages';


ReactDOM.render(
  <BrowserRouter>
    <GlobalStyles/> 
      <ThemeProvider theme={theme}>
        
        <Switch>
          <Route exact pate='/' component={Door}/>
          <Route exact pate='/main' component={Main}/>
          <Route exact pate='/mypage' component={Mypage}/>
        </Switch>
        
      </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
