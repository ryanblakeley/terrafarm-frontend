import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import UpdateTaskMutation from '../mutations/UpdateTaskMutation';
import DeleteTaskMutation from '../mutations/DeleteTaskMutation';

import classNames from '../styles/EditTaskFormStylesheet.css';

class EditTaskForm extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    canSubmit: false,
  };
  handleValid = () => {
    this.setState({ canSubmit: true });
  }
  handleInvalid = () => {
    this.setState({ canSubmit: false });
  }
  handleClose = () => {
    const {notifyClose} = this.props;
    if (notifyClose) notifyClose();
  }
  handleFormError = data => {
    console.error('Form error:', data);
  }
  handleSubmit = data => {
    const {task} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new UpdateTaskMutation({
        taskPatch: data,
        task,
      })
    );

    this.handleClose();
  }
  handleDelete = () => {
    const {task, query} = this.props;
    const {router} = this.context;
    const projectId = task.projectByProjectId.id;

    Relay.Store.commitUpdate(
      new DeleteTaskMutation({
        task,
        query,
      })
    );

    this.handleClose();

    router.push(`/project/${projectId}`);
  }
  render () {
    const {task} = this.props;
    const {canSubmit} = this.state;

    return <div className={classNames.this} >
      <Formsy.Form
        onValid={this.handleValid}
        onInvalid={this.handleInvalid}
        onValidSubmit={this.handleSubmit}
        onInvalidSubmit={this.handleFormError}
      >
        <TextInput
          name={'name'}
          label={'Name'}
          initialValue={task.name}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          initialValue={task.description}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <div className={classNames.buttons}>
          <FlatButton
            label={'Delete'}
            onTouchTap={this.handleDelete}
          />
          <FlatButton
            label={'Cancel'}
            secondary
            onTouchTap={this.handleClose}
          />
          <RaisedButton
            label={'Save'}
            primary
            type={'submit'}
            disabled={!canSubmit}
          />
        </div>
      </Formsy.Form>
    </div>;
  }
}

export default Relay.createContainer(EditTaskForm, {
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        id,
        name,
        description,
        projectByProjectId {
          id,
        },
        ${UpdateTaskMutation.getFragment('task')},
        ${DeleteTaskMutation.getFragment('task')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteTaskMutation.getFragment('query')},
      }
    `,
  },
});

