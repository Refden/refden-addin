import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Login from '../components/Login';

import 'purecss/build/pure-min.css';

storiesOf('Login', module)
  .add('default', () => <Login handleLogin={action('Login...')} />);
