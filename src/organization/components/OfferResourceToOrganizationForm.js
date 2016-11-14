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
  handleSubmit = data => {
    const {organization} = this.props;

    Relay.Store.commitUpdate(
      new CreateOrganizationResourceMutation({
        organization,
        resource: data.resource,
        status: 'OFFERED',
      })
    );
  }
  render () {
    const {currentPerson, notifyClose} = this.props;
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
    >
      <SelectInput
        name={'resource'}
        label={'Select resource to offer'}
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
