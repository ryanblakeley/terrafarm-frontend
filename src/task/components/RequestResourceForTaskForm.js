import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
import TextInput from '../../shared/components/TextInput';
import CreateTaskResourceMutation from '../mutations/CreateTaskResourceMutation';

class RequestResourceForTaskForm extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
    authorized: false,
  };
  componentWillMount () {
    const {task, currentPerson} = this.props;
    const authorized = task.authorId === currentPerson.rowId;
    this.setState({authorized});
  }
  handleSubmit = data => {
    const {task} = this.props;

    Relay.Store.commitUpdate(
      new CreateTaskResourceMutation({
        task,
        resource: data.resource,
        contact: data.contact,
        status: 'REQUESTED',
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    this.props.notifyClose();
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {currentPerson, notifyClose} = this.props;
    const { error, authorized } = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
      showForm={authorized}
    >
      <SelectInput
        name={'resource'}
        label={'Resources you starred'}
        required
      >
        {currentPerson.resourceStarsByUserId.edges.map(edge => <MenuItem
          value={edge.node.resourceByResourceId}
          key={edge.node.resourceByResourceId.id}
          primaryText={edge.node.resourceByResourceId.name}
        />)}
      </SelectInput>
      <TextInput
        name={'contact'}
        label={'Contact Info'}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(RequestResourceForTaskForm, {
  initialVariables: {
    taskId: null,
  },
  fragments: {
    task: () => Relay.QL`
      fragment on Task {
        authorId,
        ${CreateTaskResourceMutation.getFragment('task')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
        resourceStarsByUserId(first: 10) {
          edges {
            node {
              resourceByResourceId {
                id,
                name,
                ${CreateTaskResourceMutation.getFragment('resource')},
              }
            }
          }
        },
      }
    `,
  },
});
