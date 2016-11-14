import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import UpdateOrganizationMutation from '../mutations/UpdateOrganizationMutation';
import DeleteOrganizationMutation from '../mutations/DeleteOrganizationMutation';

class EditOrganizationForm extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object,
    query: React.PropTypes.object,
    notifyClose: React.PropTypes.func,
  };
  static contextTypes = {
    router: React.PropTypes.object,
  };
  state = {
    error: false,
  };
  handleSubmit = data => {
    const {organization} = this.props;

    Relay.Store.commitUpdate(
      new UpdateOrganizationMutation({
        organizationPatch: data,
        organization,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleDelete = () => {
    const {organization, query} = this.props;

    Relay.Store.commitUpdate(
      new DeleteOrganizationMutation({
        organization,
        query,
      }), {
        onSuccess: this.handleSuccessDelete,
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
  handleSuccessDelete = response => {
    const {router} = this.context;
    router.replace('/profile');
  }
  render () {
    const {organization, notifyClose} = this.props;
    const { error } = this.state;
    return <ActionPanelForm
      title={'Edit Organization'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        initialValue={organization.name}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        initialValue={organization.location}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        initialValue={organization.description}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        initialValue={organization.imageUrl}
        validations={'isUrl'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(EditOrganizationForm, {
  initialVariables: {
    organizationId: null,
  },
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        name,
        location,
        description,
        imageUrl,
        ${UpdateOrganizationMutation.getFragment('organization')},
        ${DeleteOrganizationMutation.getFragment('organization')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${DeleteOrganizationMutation.getFragment('query')},
      }
    `,
  },
});
