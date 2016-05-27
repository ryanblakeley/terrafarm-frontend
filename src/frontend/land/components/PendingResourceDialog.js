import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FaAsterisk from 'react-icons/lib/fa/asterisk';
import RemovePendingResourceToLand from '../../shared/components/RemovePendingResourceToLand';
import AddResourceToLand from './AddResource';

import classNames from '../styles/PendingResourceDialogStylesheet.css';

class PendingResourceDialog extends React.Component {
  static propTypes = {
    land: React.PropTypes.object,
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
    const {land, resource} = this.props;
    const owner = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingResourceToLand
        resource={resource}
        land={land}
        label={'Decline'}
        secondary
        onComplete={this.handleClose}
      />,
      <AddResourceToLand
        resource={resource}
        land={land}
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
          <span> to the <strong>{land.name}</strong> land.</span>
        </p>
        <p>
          You may email {owner.name} at <a href={`mailto:${owner.email}`}>
          {owner.email}</a>.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(PendingResourceDialog, {
  fragments: {
    land: () => Relay.QL`
      fragment on Land {
        id,
        ${AddResourceToLand.getFragment('land')},
        ${RemovePendingResourceToLand.getFragment('land')},
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
        ${AddResourceToLand.getFragment('resource')},
        ${RemovePendingResourceToLand.getFragment('resource')},
      }
    `,
  },
});

