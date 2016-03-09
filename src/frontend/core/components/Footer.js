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
  button: { fontSize: 'inherit' },
  link: { color: Colors.brown900 },
  icon: { color: Colors.brown600 },
};

export default class Footer extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }
  handleClickAbout = () => {
    this.context.router.push('/about');
  }
  render () {
    if (this.context.router.isActive('home')) {
      return null;
    }
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
      <div>
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          onTouchTap={this.handleClickAbout}
        >
          <MdInfoOutline className={classNames.icon} />
        </IconButton>
      </div>
    </footer>;
  }
}
