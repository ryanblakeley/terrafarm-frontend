import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MdRemove from 'react-icons/lib/md/remove';
import RemoveResourceFromProject from './RemoveResourceFromProject';

import classNames from '../styles/RemoveResourceFromProjectDialogStylesheet.css';

class RemoveResourceFromProjectDialog extends React.Component {
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
    const actions = [
      <FlatButton
        label={'Cancel'}
        secondary
        onTouchTap={this.handleClose}
      />,
      <RemoveResourceFromProject
        resource={resource}
        project={project}
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
          <span> from the project <span className={classNames.link}>{project.name}</span>.</span>
        </p>
      </Dialog>
    </div>;
  }
}

export default Relay.createContainer(RemoveResourceFromProjectDialog, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        name,
        ${RemoveResourceFromProject.getFragment('project')},
      }
    `,
    resource: () => Relay.QL`
      fragment on Resource {
        id,
        name,
        ${RemoveResourceFromProject.getFragment('resource')},
      }
    `,
  },
});
