import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FaAsterisk from 'react-icons/lib/fa/asterisk';
import RemovePendingResourceToTask from '../../shared/components/RemovePendingResourceToTask';
import AddResourceToTask from './AddResource';

import classNames from '../styles/PendingResourceDialogStylesheet.css';

class PendingResourceDialog extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
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
    const {task, resource} = this.props;
    const owner = resource.users.edges[0].node;
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemovePendingResourceToTask
        resource={resource}
        task={task}
        label={'Decline'}
        secondary
        onComplete={this.handleClose}
      />,
      <AddResourceToTask
        resource={resource}
        task={task}
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
          <Link to={`/user/${owner.id}`} style={{textDecoration: 'underline'}}>
            {owner.name}
          </Link>
          <span> has offered </span>
          <Link to={`/resource/${resource.id}`}>
            {resource.name}
          </Link>
          <span> to the <strong>{task.name}</strong> task.</span>
        </p>
        <p>
          You may email {owner.name} at <a href={`mailto:${owner.email}`}>{owner.email}</a>.
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(PendingResourceDialog, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        ${AddResourceToTask.getFragment('task')},
        ${RemovePendingResourceToTask.getFragment('task')},
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
        ${AddResourceToTask.getFragment('resource')},
        ${RemovePendingResourceToTask.getFragment('resource')},
      }
    `,
  },
});

