import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
// import SelectInputItem from '../../shared/components/SelectInputItem';
import CreateOrganizationResourceMutation from '../mutations/CreateOrganizationResourceMutation';

class RequestResourceForOrganizationForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
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
    const {error} = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
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

export default Relay.createContainer(RequestResourceForOrganizationForm, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${CreateOrganizationResourceMutation.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        allResources(first: 10) {
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
