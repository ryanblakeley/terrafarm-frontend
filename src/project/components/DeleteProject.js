import React from 'react';
import Relay from 'react-relay';
import FlatButton from 'material-ui/FlatButton';

import DeleteProjectMutation from '../mutations/DeleteProjectMutation';

class DeleteProject extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    master: React.PropTypes.object,
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
      new DeleteProjectMutation({
        master,
        project,
      })
    );

    this.handleComplete();
  }
  handleComplete = () => {
    const {project} = this.props;
    const {router} = this.context;
    const parentLand = project.lands.edges[0].node;

    if (this.props.onComplete) {
      this.props.onComplete();
    }
    router.push(`/land/${parentLand.id}`);
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
        lands(first: 1) {
          edges {
            node { id }
          }
        },
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
