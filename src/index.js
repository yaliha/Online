import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import {App} from './App';
import { ToastContainer, toast } from 'react-toastify';
// import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
          <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

