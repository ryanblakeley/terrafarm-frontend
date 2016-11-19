import React from 'react';
import classNames from 'classnames/bind';
import AppLogoIcon from './AppLogoIcon';
import AppLogoName from './AppLogoName';
import PageHeading from './PageHeading';
import classNamesContext from '../styles/AppLogoStylesheet.css';

const cx = classNames.bind(classNamesContext);

class AppLogo extends React.Component {
  static propTypes = {
    stacked: React.PropTypes.bool,
    text: React.PropTypes.string,
  };
  static contextTypes = {
    location: React.PropTypes.object,
  };
  static defaultProps = {
    stacked: false,
  };
  state = {
    showLabel: false,
  };
  handleMouseEnter = _ => {
    this.setState({showLabel: true});
  }
  handleMouseLeave = _ => {
    this.setState({showLabel: false});
  }
  render () {
    const {showLabel} = this.state;

    return <div
      className={cx({this: true, stacked: this.props.stacked})}
    >
      <AppLogoIcon
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
      {showLabel
        ? <PageHeading text={'PROFILE'} />
        : <AppLogoName />
      }
    </div>;
  }
}

export default AppLogo;
