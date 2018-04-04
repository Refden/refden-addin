import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'toastr/build/toastr.min.css';

window.Office.initialize = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};
