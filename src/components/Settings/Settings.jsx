import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import Bibliography from '../Bibliography/Bibliography';
import { LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE } from "../../constants";

const STYLES = [
  { key: 'american-medical-association', text: 'American Medical Association' },
  { key: 'apa', text: 'APA' },
  { key: 'apa-no-ampersand', text: 'APA without &' },
];

const LOCALES = [
  { key: 'en-US', text: 'en-US' },
  { key: 'en-GB', text: 'en-GB' },
  { key: 'es-ES', text: 'es-ES' },
];

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStyleKey: localStorage.getItem(LOCAL_STORAGE__STYLE) || 'apa',
      selectedLocaleKey: localStorage.getItem(LOCAL_STORAGE__LOCALE) || 'en-US',
    };
  }

  changeStyle = item => {
    localStorage.setItem(LOCAL_STORAGE__STYLE, item.key);
    this.setState({ selectedStyleKey: item.key });
  };

  changeLocale = item => {
    localStorage.setItem(LOCAL_STORAGE__LOCALE, item.key);
    this.setState({ selectedLocaleKey: item.key });
  };

  render = () => (
    [
      <Bibliography />,
      <div className="pure-u-1">
        <Dropdown
          label='Style:'
          selectedKey={this.state.selectedStyleKey}
          onChanged={this.changeStyle}
          placeHolder='Select an Style'
          options={STYLES}
        />
      </div>,
      <div className="pure-u-1">
        <Dropdown
          label='Locale:'
          selectedKey={this.state.selectedLocaleKey}
          onChanged={this.changeLocale}
          placeHolder='Select a Locale'
          options={LOCALES}
        />
      </div>,
    ]
  );
}

export default Settings;
