import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
