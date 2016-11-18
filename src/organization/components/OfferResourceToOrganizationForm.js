import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import ZeroResourcesWarning from '../../shared/components/ZeroResourcesWarning';
import CreateOrganizationResourceMutation from '../mutations/CreateOrganizationResourceMutation';

class OfferResourceToOrganizationForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {organization} = this.props;

    Relay.Store.commitUpdate(
      new CreateOrganizationResourceMutation({
        organization,
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
    const {error} = this.state;
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
      onDelete={this.handleDelete}
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

export default Relay.createContainer(OfferResourceToOrganizationForm, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${CreateOrganizationResourceMutation.getFragment('organization')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        resourcesByOwnerId(first: 10) {
          edges {
            node {
              id,
              name,
              ${CreateOrganizationResourceMutation.getFragment('resource')},
            }
          }
        },
      }
    `,
  },
});
