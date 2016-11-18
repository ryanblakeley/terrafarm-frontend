import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import CreateTaskResourceMutation from '../mutations/CreateTaskResourceMutation';

class RequestResourceForTaskForm extends React.Component {
  static propTypes = {
    task: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {task} = this.props;

    Relay.Store.commitUpdate(
      new CreateTaskResourceMutation({
        task,
        resource: data.resource,
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
    const { error } = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
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
        ${CreateTaskResourceMutation.getFragment('task')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
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
