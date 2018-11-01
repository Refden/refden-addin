import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import Bibliography from '../Bibliography/Bibliography';
import { LOCAL_STORAGE__STYLE, LOCAL_STORAGE__LOCALE } from "../../constants";

import { updateBibliography } from '../../lib/generateBibliography/index';

const STYLES = [
  { key: 'american-medical-association', text: 'American Medical Association' },
  { key: 'american-society-of-mechanical-engineers', text: 'ASME' },
  { key: 'apa', text: 'APA' },
  { key: 'apa-no-ampersand', text: 'APA without &' },
  { key: 'ieee', text: 'IEEE' },
  { key: 'vancouver', text: 'Vancouver' },
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
    updateBibliography();
  };

  changeLocale = item => {
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
          onChanged={this.changeStyle}
          placeHolder='Select an Style'
          options={STYLES}
        />
      </div>,
      <div key="locales" className="pure-u-1">
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
