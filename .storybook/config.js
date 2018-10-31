import { configure } from '@storybook/react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import 'purecss/build/pure-min.css';

initializeIcons();

function loadStories() {
  require('../src/stories');

  const req = require.context('../src/components', true, /.stories.jsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
