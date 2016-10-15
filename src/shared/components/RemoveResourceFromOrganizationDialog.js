import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MdRemove from 'react-icons/lib/md/remove';
import RemoveResourceFromOrganization from './RemoveResourceFromOrganization';

import classNames from '../styles/RemoveResourceFromOrganizationDialogStylesheet.css';

class RemoveResourceFromOrganizationDialog extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
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
    const {organization, resource} = this.props;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveResourceFromOrganization
        resource={resource}
        organization={organization}
        primary
        onComplete={this.handleClose}
      />,
    ];

    return <div className={classNames.icon} >
      <MdRemove onTouchTap={this.handleOpen} className={classNames.pointer} />
      <Dialog
        title={'Remove Resource'}
        actions={actions}
        onRequestClose={null}
        open={this.state.open}
      >
        <p>
          <span>Please confirm that you would like to remove the resource </span>
          <Link to={`/resource/${resource.id}`} className={classNames.link}>
            {resource.name}
          </Link>
          <span> from the organization <span className={classNames.link}>{organization.name}</span>.</span>
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(RemoveResourceFromOrganizationDialog, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        ${RemoveResourceFromOrganization.getFragment('organization')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromOrganization.getFragment('resource')},
      }
    `,
  },
});
