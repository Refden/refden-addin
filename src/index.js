import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import 'react-app-polyfill/ie11'; // NOTE: support for ie11 for now

import App from './components/App';

import './index.css';
import 'toastr/build/toastr.min.css';
import 'purecss/build/pure-min.css';

// INFO: The add-in is ready to start interacting with the application and hosted document.
window.Office.initialize = () => {
  initializeIcons();
  ReactDOM.render(<App />, document.getElementById('root'));
};
