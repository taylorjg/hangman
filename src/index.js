import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import { api } from './api';

ReactDOM.render(<App api={api} />, document.getElementById('root'));
registerServiceWorker();
