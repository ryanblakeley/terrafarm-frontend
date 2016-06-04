import React from 'react';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';

import classNames from '../styles/AppFooterStylesheet.css';
const styles = {
  this: {
    backgroundColor: Colors.brown100,
    borderColor: Colors.brown400,
  },
};

const AppFooter = () => <footer className={classNames.this} style={styles.this}>
  <div className={classNames.appTitle}>
    <Link
      to={'/'}
      className={classNames.link}
      style={styles.link}
    >
      Terrafarm
    </Link>
  </div>
  <h6 className={classNames.footerMessage}>Prototype</h6>
</footer>;

export default AppFooter;
