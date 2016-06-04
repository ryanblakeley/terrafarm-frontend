import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IoIosWorld from 'react-icons/lib/io/ios-world';
import IoIosWorldOutline from 'react-icons/lib/io/ios-world-outline';

import classNames from '../styles/AppLogoIconStylesheet.css';
const styles = {
  icon: {
    color: '',
    cursor: 'default',
  },
};

export default class AppLogoIcon extends React.Component {
  static propTypes = {
    outline: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  static defaultProps = {
    outline: false,
  }
  handleProfile = () => {
    const {router, loggedIn} = this.context;

    if (loggedIn) {
      router.push('/profile');
    }
  }
  render () {
    const {loggedIn} = this.context;
    const {outline} = this.props;

    styles.icon.cursor = loggedIn ? 'pointer' : 'default';
    styles.icon.color = loggedIn ? Colors.cyan200 : Colors.cyan50;

    return <div className={classNames.this}>
      {outline
        ? <IoIosWorldOutline
          className={classNames.icon}
          style={styles.icon}
          onClick={loggedIn ? this.handleProfile : null}
          onTouchTap={loggedIn ? this.handleProfile : null}
        />
        : <IoIosWorld
          className={classNames.icon}
          style={styles.icon}
          onClick={loggedIn ? this.handleProfile : null}
          onTouchTap={loggedIn ? this.handleProfile : null}
        />
      }
    </div>;
  }
}
