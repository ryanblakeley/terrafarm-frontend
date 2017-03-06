import React from 'react';
import {FlatButton} from 'shared/components/Material';
import {SearchIcon} from 'shared/components/Icons';

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

    return <div>
      <FlatButton
        onClick={this.handleBrowse}
        onTouchTap={this.handleBrowse}
        label={'Browse'}
        icon={<SearchIcon />}
        disabled={disabled}
      />
    </div>;
  }
}
