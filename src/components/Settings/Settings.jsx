import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import Bibliography from '../Bibliography/Bibliography';
import { LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE, STYLES, LOCALES } from '../../constants';

import { updateBibliography } from '../../lib/bibliography/index';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStyleKey: localStorage.getItem(LOCAL_STORAGE__STYLE) || 'apa',
      selectedLocaleKey: localStorage.getItem(LOCAL_STORAGE__LOCALE) || 'en-US',
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
          label='Style:'
          selectedKey={this.state.selectedStyleKey}
          onChange={this.changeStyle}
          placeHolder='Select an Style'
          options={STYLES}
        />
      </div>,
      <div key="locales" className="pure-u-1">
        <Dropdown
          label='Locale:'
          selectedKey={this.state.selectedLocaleKey}
          onChange={this.changeLocale}
          placeHolder='Select a Locale'
          options={LOCALES}
        />
      </div>,
    ]
  );
}

export default Settings;
