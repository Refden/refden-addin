import React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import generateBibliography from '../../lib/bibliography'

import './Bibliography.css';

const Bibliography = () => (
  <div className="pure-u-1">
    <DefaultButton
      primary
      className="pure-u-1 bibliography-btn"
      onClick={generateBibliography}
    >
      Update Bibliography
    </DefaultButton>
  </div>
);

export default Bibliography;
