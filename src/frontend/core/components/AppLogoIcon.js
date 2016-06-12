import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import IoIosWorld from 'react-icons/lib/io/ios-world';
import IoIosWorldOutline from 'react-icons/lib/io/ios-world-outline';

import classNames from 'classnames/bind';
import classNamesContext from '../styles/AppLogoIconStylesheet.css';
const cx = classNames.bind(classNamesContext);
const styles = {
  icon: {
    color: '',
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
  getIcon () {
    const {loggedIn} = this.context;
    const {outline} = this.props;

    styles.icon.color = loggedIn ? Colors.cyan200 : Colors.cyan50;

    if (outline) {
      return <IoIosWorldOutline
        className={cx({icon: true, disabled: !loggedIn})}
        style={styles.icon}
        onClick={loggedIn ? this.handleProfile : null}
        onTouchTap={loggedIn ? this.handleProfile : null}
      />;
    }
    return <IoIosWorld
      className={cx({icon: true, disabled: !loggedIn})}
      style={styles.icon}
      onClick={loggedIn ? this.handleProfile : null}
      onTouchTap={loggedIn ? this.handleProfile : null}
    />;
  }
  handleProfile = () => {
    const {router, loggedIn} = this.context;

    if (loggedIn) {
      router.push('/profile');
    }
  }
  render () {
    const icon = this.getIcon();

    return <div className={cx({this: true})}>
      {icon}
    </div>;
  }
}
