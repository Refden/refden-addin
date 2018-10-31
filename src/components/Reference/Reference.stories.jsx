import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { customHost } from '../../stories';

import Reference from './Reference';

storiesOf('Reference', module)
  .addDecorator(customHost())
  .add('default', () => <Reference
      reference={
        {
          id: 1,
          title: 'Aging Triggers a Repressive Chromatin State at Bdnf Promoters in Hippocampal Neurons',
          published_year: 2016,
          authors: [
            {
              id: 47,
              name: 'Palomer, E.',
            },
            {
              id: 48,
              name: 'Martín-Segura, A.',
            },
            {
              id: 49,
              name: 'Baliyan, S.',
            },
            {
              id: 50,
              name: 'Ahmed, T.',
            },
          ],
        }
      }
      onClick={action('Insert Reference')}
    />,
  );
