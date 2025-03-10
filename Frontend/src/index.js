import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {persistor, store} from './redux/store.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
