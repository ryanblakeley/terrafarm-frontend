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
    query: React.PropTypes.object,
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
    const {query, notifyClose} = this.props;
    const { error } = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <SelectInput
        name={'resource'}
        label={'Select a resource to request'}
        required
      >
        {query.allResources.edges.map(edge => <MenuItem
          value={edge.node}
          key={edge.node.id}
          primaryText={edge.node.name}
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
    query: () => Relay.QL`
      fragment on Query {
        allResources(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateTaskResourceMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
