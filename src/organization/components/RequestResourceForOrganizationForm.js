import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
import TextInput from '../../shared/components/TextInput';
import CreateOrganizationResourceMutation from '../mutations/CreateOrganizationResourceMutation';

class RequestResourceForOrganizationForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    currentPerson: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  state = {
    error: false,
    authorized: false,
  };
  componentWillMount () {
    const {organization, currentPerson} = this.props;
    const authorized = !!organization.organizationMembersByOrganizationId.edges.findIndex(edge => (
      edge.node.userByMemberId.rowId === currentPerson.rowId
    )) > -1;
    this.setState({authorized});
  }
  handleSubmit = data => {
    const {organization} = this.props;

    Relay.Store.commitUpdate(
      new CreateOrganizationResourceMutation({
        organization,
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
    const {error, authorized} = this.state;

    return <ActionPanelForm
      title={'Request Resource'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
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

export default Relay.createContainer(RequestResourceForOrganizationForm, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        organizationMembersByOrganizationId(first: 10) {
          edges {
            node {
              userByMemberId {
                rowId,
              }
            }
          }
        },
        ${CreateOrganizationResourceMutation.getFragment('organization')},
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
                ${CreateOrganizationResourceMutation.getFragment('resource')},
              }
            }
          }
        },
      }
    `,
  },
});
