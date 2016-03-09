import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import MdMenu from 'react-icons/lib/md/menu';

import classNames from 'classnames/bind';
import classNamesContext from '../styles/MainMenuToggleStylesheet.css';
const cx = classNames.bind(classNamesContext);

export default class MainMenuToggle extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
  };
  static contextTypes = {
    loggedIn: React.PropTypes.bool,
  };
  handleClick = () => {
    const {onClick} = this.props;
    if (onClick) {
      onClick();
    }
  }
  render () {
    const {loggedIn} = this.context;

    return <div className={cx({this: true, disabled: !loggedIn})} >
      {loggedIn
        && <IconButton onTouchTap={this.handleClick} iconStyle={{color: Colors.blueGrey500}}>
          <MdMenu className={cx({icon: true})} />
        </IconButton>
      }
    </div>;
  }
}

