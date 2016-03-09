import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import MdRemove from 'react-icons/lib/md/remove';
import RemoveResourceFromGroup from './RemoveResourceFromGroup';

import classNames from '../styles/RemoveResourceFromGroupDialogStylesheet.css';

class RemoveResourceFromGroupDialog extends React.Component {
  static propTypes = {
    group: React.PropTypes.object,
    resource: React.PropTypes.object,
  };
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
  }
  render () {
    const {group, resource} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveResourceFromGroup
        resource={resource}
        group={group}
        primary
        onComplete={this.handleClose}
      />,
    ];

    return <div className={classNames.icon} >
      <MdRemove onTouchTap={this.handleOpen} />
      <Dialog
        title={'Remove Resource'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <span>Please confirm that you would like to remove </span>
          <Link to={`/auth/resource/${resource.id}`} style={{textDecoration: 'underline'}}>
            {resource.name}
          </Link>
          <span> from the group.</span>
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(RemoveResourceFromGroupDialog, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${RemoveResourceFromGroup.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromGroup.getFragment('resource')},
      }
    `,
  },
});
