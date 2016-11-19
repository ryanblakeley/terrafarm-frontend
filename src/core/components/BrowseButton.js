import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IoIosSearch from 'react-icons/lib/io/ios-search';
import classNames from '../styles/BrowseButtonStylesheet.css';

export default class BrowseButton extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  };
  handleBrowse = () => {
    const {router} = this.context;

    router.push('/browse');
  }
  render () {
    const {router} = this.context;
    const disabled = router.isActive('browse');

    return <div className={classNames.this}>
      <FlatButton
        onClick={this.handleBrowse}
        onTouchTap={this.handleBrowse}
        label={'Browse'}
        className={classNames.button}
        icon={<IoIosSearch style={{color: ''}} className={classNames.icon} />}
        disabled={disabled}
      />
    </div>;
  }
}
