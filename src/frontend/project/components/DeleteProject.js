import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/lib/flat-button';

import DeleteProjectMutation from '../mutations/DeleteProjectMutation';

class DeleteProject extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    default: React.PropTypes.bool,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  static defaultProps = {
    label: 'Delete',
    primary: false,
    secondary: false,
    default: true,
  };
  handleDelete = () => {
    const {project, master} = this.props;

    Relay.Store.commitUpdate(
      new DeleteLandMutation({
        master,
        project,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {router} = this.context;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push('/auth/profile');
  }
  render () {
    return (
      <FlatButton
        {...this.props}
        label={'Delete'}
        onTouchTap={this.handleDelete}
      />
    );
  }
}

export default Relay.createContainer(DeleteProject, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        ${DeleteProjectMutation.getFragment('project')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${DeleteProjectMutation.getFragment('master')},
      }
    `,
  },
});
