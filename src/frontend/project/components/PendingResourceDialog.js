import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import FaAsterisk from 'react-icons/lib/fa/asterisk';
import RemovePendingResourceToProject from '../../shared/components/RemovePendingResourceToProject';
import AddResourceToProject from './AddResource';

import classNames from '../styles/PendingResourceDialogStylesheet.css';

class PendingResourceDialog extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
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
    const {project, resource} = this.props;
    const owner = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingResourceToProject
        resource={resource}
        project={project}
        label={'Decline'}
        secondary
        onComplete={this.handleClose}
      />,
      <AddResourceToProject
        resource={resource}
        project={project}
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
          <span> to the <strong>{project.name}</strong> project.</span>
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
    project: () => Relay.QL`
      fragment on Project {
        id,
        ${AddResourceToProject.getFragment('project')},
        ${RemovePendingResourceToProject.getFragment('project')},
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
        ${AddResourceToProject.getFragment('resource')},
        ${RemovePendingResourceToProject.getFragment('resource')},
      }
    `,
  },
});

