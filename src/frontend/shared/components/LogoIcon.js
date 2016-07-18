import React from 'react';
import logoIcon from './logo_icon.svg';
// import SVGIcon from 'material-ui/lib/svg-icon';
// import InlineSVG from 'react-inlinesvg';

import classNames from '../styles/LogoIconStylesheet.css';

export default class LogoIcon extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  };
  static defaultProps = {
    className: '',
    style: {},
    width: 50,
    height: 50,
  }
  render () {
/*
    return <img alt={'logo'} src={logoIcon} />;

    return <SVGIcon
      className={cx({icon: true, disabled: !loggedIn})}
      style={styles.icon}
      onClick={loggedIn ? this.handleProfile : null}
      onTouchTap={loggedIn ? this.handleProfile : null}
    ></SVGIcon>;
*/
    return <div className={classNames.this}>
      <img src={logoIcon} alt={'logo_icon'} {...this.props} />
    </div>;
  }
}
