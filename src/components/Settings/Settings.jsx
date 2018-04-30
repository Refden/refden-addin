import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

const STYLE = 'style';
const STYLES = [
  { key: 'apa', text: 'APA' },
  { key: 'apa-no-ampersand', text: 'APA without &' },
];

const LOCALE = 'locale';
const LOCALES = [
  { key: 'en-US', text: 'en-US' },
  { key: 'en-GB', text: 'en-GB' },
  { key: 'es-ES', text: 'es-ES' },
];

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStyleKey: localStorage.getItem(STYLE) || 'apa',
      selectedLocaleKey: localStorage.getItem(LOCALE) || 'en-US',
    };
  }

  changeStyle = item => {
    localStorage.setItem(STYLE, item.key);
    this.setState({ selectedStyleKey: item.key });
  };

  changeLocale = item => {
    localStorage.setItem(LOCALE, item.key);
    this.setState({ selectedLocaleKey: item.key });
  };

  render = () => (
    <div className="pure-g">
      <div className="pure-u-1">
        <Dropdown
          label='Style:'
          selectedKey={this.state.selectedStyleKey}
          onChanged={this.changeStyle}
          placeHolder='Select an Style'
          options={STYLES}
        />
      </div>
      <div className="pure-u-1">
        <Dropdown
          label='Locale:'
          selectedKey={this.state.selectedLocaleKey}
          onChanged={this.changeLocale}
          placeHolder='Select a Locale'
          options={LOCALES}
        />
      </div>
    </div>
  );
}

export default Settings;
