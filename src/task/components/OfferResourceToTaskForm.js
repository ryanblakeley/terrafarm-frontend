import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
import TextInput from '../../shared/components/TextInput';
import ZeroResourcesWarning from '../../shared/components/ZeroResourcesWarning';
import CreateTaskResourceMutation from '../mutations/CreateTaskResourceMutation';

class OfferResourceToTaskForm extends React.Component {
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
        contact: data.contact,
        status: 'OFFERED',
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
    const ownerResources = currentPerson.resourcesByOwnerId
      .edges.map(edge => <MenuItem
        value={edge.node}
        key={edge.node.id}
        primaryText={edge.node.name}
      />);

    return <ActionPanelForm
      title={'Offer Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      showForm={ownerResources.length > 0}
      formBlockedMessage={<ZeroResourcesWarning />}
      error={error}
    >
      <SelectInput
        name={'resource'}
        label={'Resources you own'}
        required
      >
        {ownerResources}
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

export default Relay.createContainer(OfferResourceToTaskForm, {
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
        resourcesByOwnerId(first: 10) {
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
