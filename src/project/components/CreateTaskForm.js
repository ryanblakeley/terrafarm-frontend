import React from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../../shared/components/TextInput';
import CreateTaskMutation from '../mutations/CreateTaskMutation';

import classNames from '../styles/CreateTaskFormStylesheet.css';

class CreateTaskForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
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
    const {project, query} = this.props;

    if (!this.state.canSubmit) {
      console.warn('New resource is not ready');
      return;
    }

    Relay.Store.commitUpdate(
      new CreateTaskMutation({
        taskData: data,
        project,
        query,
      })
    );

    this.handleClose();
  }
  render () {
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
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
          required
        />
        <TextInput
          name={'description'}
          label={'Description'}
          validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
          required
          multiLine
          rows={3}
        />
        <div className={classNames.buttons}>
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

export default Relay.createContainer(CreateTaskForm, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${CreateTaskMutation.getFragment('project')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateTaskMutation.getFragment('query')},
      }
    `,
  },
});
