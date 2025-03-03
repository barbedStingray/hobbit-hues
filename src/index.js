import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { HashRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store';

import App from './App.jsx';


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
