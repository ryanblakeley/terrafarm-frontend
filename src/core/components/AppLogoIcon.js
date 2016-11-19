import React from 'react';
import classnames from 'classnames/bind';
import LogoIcon from '../../shared/components/LogoIcon';
import classNamesContext from '../styles/AppLogoIconStylesheet.css';

const cx = classnames.bind(classNamesContext);

export default class AppLogoIcon extends React.Component {
  static propTypes = {
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  handleProfile = () => {
    const {router, loggedIn} = this.context;

    if (loggedIn) {
      router.push('/profile');
    }
  }
  handleMouseEnter = _ => {
    const {onMouseEnter} = this.props;
    if (onMouseEnter) onMouseEnter();
  }
  handleMouseLeave = _ => {
    const {onMouseLeave} = this.props;
    if (onMouseLeave) onMouseLeave();
  }
  render () {
    const {loggedIn} = this.context;

    return <div
      className={cx({this: true})}
      onClick={this.handleProfile}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
    >
      <LogoIcon
        className={cx({icon: true, faded: !loggedIn})}
        width={52} height={52}
      />
    </div>;
  }
}
