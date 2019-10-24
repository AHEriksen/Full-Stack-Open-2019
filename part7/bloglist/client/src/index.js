
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store.js';
import { Provider } from 'react-redux';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './themes/muiTheme';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Provider>, document.getElementById('root')
  );
};

renderApp();
store.subscribe(renderApp);