import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import MdRemove from 'react-icons/lib/md/remove';
import RemoveResourceFromTask from './RemoveResourceFromTask';

import classNames from '../styles/RemoveResourceFromTaskDialogStylesheet.css';

class RemoveResourceFromTaskDialog extends React.Component {
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
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveResourceFromTask
        resource={resource}
        task={task}
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
          <span> from the task <span className={classNames.link}>{task.name}</span>.</span>
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(RemoveResourceFromTaskDialog, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        ${RemoveResourceFromTask.getFragment('task')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromTask.getFragment('resource')},
      }
    `,
  },
});
