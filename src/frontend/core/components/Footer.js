import React from 'react';
import {Link} from 'react-router';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MdInfoOutline from 'react-icons/lib/md/info-outline';

import classNames from '../styles/FooterStylesheet.css';
const styles = {
  this: {
    backgroundColor: Colors.brown100,
    borderColor: Colors.brown400,
  },
};

export default class Footer extends React.Component {
  render () {
    return <footer className={classNames.this} style={styles.this}>
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
  }
}
