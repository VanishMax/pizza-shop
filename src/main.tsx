import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './assets/global.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app'),
);
