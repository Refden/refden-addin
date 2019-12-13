import React, { Component } from 'react';
import _ from 'lodash/fp';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import Bibliography from '../Bibliography/Bibliography';
import {
  LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE, STYLES, LOCALES,
} from '../../constants';
import { updateBibliography } from '../../lib/bibliography/index';

const DEFAULT_STYLE = 'apa';
const DEFAULT_LOCALE = 'en-US';

const initializeLocalStorage = () => {
  if (_.isEmpty(localStorage.getItem(LOCAL_STORAGE__STYLE))) {
    localStorage.setItem(LOCAL_STORAGE__STYLE, DEFAULT_STYLE);
  }

  if (_.isEmpty(localStorage.getItem(LOCAL_STORAGE__LOCALE))) {
    localStorage.setItem(LOCAL_STORAGE__LOCALE, DEFAULT_LOCALE);
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);

    initializeLocalStorage();

    this.state = {
      selectedStyleKey: localStorage.getItem(LOCAL_STORAGE__STYLE),
      selectedLocaleKey: localStorage.getItem(LOCAL_STORAGE__LOCALE),
    };
  }

  changeStyle = (_event, item) => {
    localStorage.setItem(LOCAL_STORAGE__STYLE, item.key);
    this.setState({ selectedStyleKey: item.key });
    updateBibliography();
  };

  changeLocale = (_event, item) => {
    localStorage.setItem(LOCAL_STORAGE__LOCALE, item.key);
    this.setState({ selectedLocaleKey: item.key });
    updateBibliography();
  };

  render = () => (
    [
      <Bibliography key="bibliography" />,
      <div key="styles" className="pure-u-1">
        <Dropdown
          label="Style:"
          selectedKey={this.state.selectedStyleKey}
          onChange={this.changeStyle}
          placeholder="Select an Style"
          options={STYLES}
        />
      </div>,
      <div key="locales" className="pure-u-1">
        <Dropdown
          label="Locale:"
          selectedKey={this.state.selectedLocaleKey}
          onChange={this.changeLocale}
          placeholder="Select a Locale"
          options={LOCALES}
        />
      </div>,
    ]
  );
}

export default Settings;
