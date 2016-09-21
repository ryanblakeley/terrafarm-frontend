import React from 'react';
import Relay from 'react-relay';
import RaisedButton from 'material-ui/lib/raised-button';

import NewTaskMutation from '../mutations/NewTaskMutation';

class NewTask extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    master: React.PropTypes.object,
    onComplete: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    attributes: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      category: React.PropTypes.string,
    }),
  };
  static defaultProps = {
    label: 'Submit',
    disabled: true,
    primary: false,
    secondary: false,
  };
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  handleSubmit = () => {
    if (this.props.disabled) {
      console.warn('New task is not ready');
      return;
    }

    const {project, master, attributes} = this.props;
    const {name, description, category} = attributes;

    Relay.Store.commitUpdate(
      new NewTaskMutation({
        project,
        master,
        name,
        description,
        category,
      })
    );

    this.onComplete();
  }
  render () {
    return (
      <RaisedButton
        label={this.props.label}
        disabled={this.props.disabled}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onTouchTap={this.handleSubmit}
      />
    );
  }
}

export default Relay.createContainer(NewTask, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        ${NewTaskMutation.getFragment('project')},
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
        ${NewTaskMutation.getFragment('master')},
      },
    `,
  },
});
