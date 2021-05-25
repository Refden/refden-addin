import React, { useEffect, useState } from 'react';
import _ from 'lodash/fp';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

import * as refden from '../../api/refden';
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

const Settings = () => {
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState('');
  const [locale, setLocale] = useState('');

  useEffect(() => {
    initializeLocalStorage();

    setStyle(localStorage.getItem(LOCAL_STORAGE__STYLE));
    setLocale(localStorage.getItem(LOCAL_STORAGE__LOCALE));
  }, []);

  useEffect(() => {
    refden.getStyles()
      .then((response) => {
        setStyles(response.data);
      });
  }, []);

  const dropDownStyles = [
    { key: 'Header', text: 'Popular styles', itemType: DropdownMenuItemType.Header },
    ...STYLES,
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'Header2', text: 'Other styles', itemType: DropdownMenuItemType.Header },
    ...styles,
  ];

  const changeStyle = (_event, item) => {
    localStorage.setItem(LOCAL_STORAGE__STYLE, item.key);
    setStyle(item.key);
    updateBibliography();
  };

  const changeLocale = (_event, item) => {
    localStorage.setItem(LOCAL_STORAGE__LOCALE, item.key);
    setLocale(item.key);
    updateBibliography();
  };

  return (
    <>
      <div key="styles" className="pure-u-1">
        <Dropdown
          label="Style:"
          selectedKey={style}
          onChange={changeStyle}
          placeholder="Select an Style"
          options={dropDownStyles}
        />
      </div>
      <div key="locales" className="pure-u-1">
        <Dropdown
          label="Locale:"
          selectedKey={locale}
          onChange={changeLocale}
          placeholder="Select a Locale"
          options={LOCALES}
        />
      </div>
      <Bibliography key="bibliography" />
    </>
  );
};

export default Settings;
