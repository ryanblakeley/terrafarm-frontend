import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FaAsterisk from 'react-icons/lib/fa/asterisk';
import RemovePendingResourceToGroup from '../../shared/components/RemovePendingResourceToGroup';
import AddResourceToGroup from './AddResource';

import classNames from '../styles/PendingResourceDialogStylesheet.css';

class PendingResourceDialog extends React.Component {
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
    const owner = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingResourceToGroup
        resource={resource}
        group={group}
        label={'Decline'}
        secondary
        onComplete={this.handleClose}
      />,
      <AddResourceToGroup
        resource={resource}
        group={group}
        primary
        onComplete={this.handleClose}
      />,
    ];

    return <div className={classNames.icon} >
      <FaAsterisk onTouchTap={this.handleOpen} />
      <Dialog
        title={'Resource Offer'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <Link to={`/auth/user/${owner.id}`} style={{textDecoration: 'underline'}}>
            {owner.name}
          </Link>
          <span> has offered </span>
          <Link to={`/auth/resource/${resource.id}`}>
            {resource.name}
          </Link>
          <span> to the <strong>{group.name}</strong> group.</span>
        </p>
        <p>
          You may email {owner.name} at <a href={'mailto:' + owner.email}>
          {owner.email}</a>.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(PendingResourceDialog, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        ${AddResourceToGroup.getFragment('group')},
        ${RemovePendingResourceToGroup.getFragment('group')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        users(first: 1) {
          edges {
            node {
              id,
              name,
              email,
            }
          }
        },
        ${AddResourceToGroup.getFragment('resource')},
        ${RemovePendingResourceToGroup.getFragment('resource')},
      }
    `,
  },
});

