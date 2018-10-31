import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { host } from 'storybook-host';

import Login from '../components/Login';
import Settings from '../components/Settings/Settings';

const WORD_TASK_PANE_WIDTH = '330px';

export const customHost = () => host({
  width: WORD_TASK_PANE_WIDTH,
  height: '100%',
  border: true,
});

storiesOf('Login', module)
  .addDecorator(customHost())
  .add('default', () => <Login handleLogin={action('Login...')} />);

storiesOf('Settings', module)
  .addDecorator(customHost())
  .add('default', () => <Settings />);
