import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'toastr/build/toastr.min.css';
import 'purecss/build/pure-min.css';

const bootstrap = () =>
  initializeIcons();
  ReactDOM.render(<App />, document.getElementById('root'));

bootstrap();
registerServiceWorker();

// INFO: The add-in is ready to start interacting with the application and hosted document.
window.Office.initialize = () => bootstrap();
