import React from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import {
  FontWeights,
  getTheme,
  IconButton,
  mergeStyleSets,
  Modal,
} from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import Settings from '../Settings/Settings';

import './Footer.css';

type Props = {
  logout: () => void;
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  header: [
    theme.fonts.xLarge,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px',
    },
  ],
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

const Footer = (props: Props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

  return (
    <div>
      <Modal
        titleAriaId="settings-modal"
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        isDarkOverlay={false}
        className="settingsModal"
        containerClassName="settingsModalContainer"
      >
        <div className={contentStyles.header}>
          <span id="settings-modal">Settings</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div style={{ padding: '12px' }}>
          <Link onClick={props.logout}>
            Log out
          </Link>
          <hr />
          <Settings />
        </div>
      </Modal>

      <div className="footer">
        <div
          className="settingsButton"
          onClick={showModal}
        >
          <Icon
            iconName="Settings"
            title="Settings"
            style={{ fontSize: 'large' }}
          />
          <Icon
            iconName="ChevronUp"
            style={{ fontSize: 'xx-small', marginLeft: '3px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
