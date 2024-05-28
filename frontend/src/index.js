import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';
import {Provider} from 'react-redux'
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <CartProvider>
    <App />
    <ToastContainer />
    </CartProvider>
    </Provider>
 
 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
