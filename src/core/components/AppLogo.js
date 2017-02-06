import React from 'react';
import classNames from 'classnames/bind';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';
import classNamesContext from '../styles/AppLogoStylesheet.css';

const cx = classNames.bind(classNamesContext);

class AppLogo extends React.Component {
  static propTypes = {
    stacked: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static defaultProps = {
    stacked: false,
  };
  handleClick = _ => {
    const {router} = this.context;
    router.push('/');
  }
  render () {
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return <div
      className={cx({this: true, stacked: this.props.stacked})}
      onClick={this.handleClick}
    >
      <AppLogoIcon />
      <AppLogoName />
    </div>;
  }
}

export default AppLogo;

/*
      {loggedIn && showLabel
        ? <PageHeading text={'PROFILE'} />
        : <AppLogoName />
      }
*/
