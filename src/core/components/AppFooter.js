import React from 'react';
import { AppName, Link } from 'shared/components/Typography';
import { LogoIcon, InformationIcon } from 'shared/components/Icons';
import { IconButton } from 'shared/components/Material';
import Layout from 'shared/components/Layout';
import { blueGrey500 } from 'tools/colors';
import classNames from '../styles/AppFooterStylesheet.css';

const styles = {
  button: {
    padding: 8,
    width: 42,
    height: 42,
  },
  icon: {
    color: blueGrey500,
  },
};

const HelpButton = () => <Layout topSmall>
  <IconButton
    style={styles.button}
    iconStyle={styles.icon}
    href={'https://terra.farm/pages/about'}
    touch
  >
    <InformationIcon className={classNames.icon} />
  </IconButton>
</Layout>;

const AppFooter = () => <footer className={classNames.this}>
  <Link to={'/'}>
    <LogoIcon />
  </Link>
  <AppName className={classNames.copyright}>&copy; 2017 Terrafarm LLC</AppName>
  <HelpButton />
</footer>;

export default AppFooter;
