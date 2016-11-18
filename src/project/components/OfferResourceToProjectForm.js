import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import ZeroResourcesWarning from '../../shared/components/ZeroResourcesWarning';
import CreateProjectResourceMutation from '../mutations/CreateProjectResourceMutation';

class OfferResourceToProjectForm extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {project} = this.props;

    Relay.Store.commitUpdate(
      new CreateProjectResourceMutation({
        project,
        resource: data.resource,
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
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(OfferResourceToProjectForm, {
  initialVariables: {
    projectId: null,
  },
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        ${CreateProjectResourceMutation.getFragment('project')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateProjectResourceMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
