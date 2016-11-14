import React from 'react';
import Relay from 'react-relay';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import TextInput from '../../shared/components/TextInput';
import CreateOrganizationMutation from '../mutations/CreateOrganizationMutation';
import CreateOrganizationMemberMutation from '../../organization/mutations/CreateOrganizationMemberMutation';

class CreateOrganizationForm extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
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
    const {user, query} = this.props;

    Relay.Store.commitUpdate(
      new CreateOrganizationMutation({
        organizationData: data,
        user,
        query,
      }), {
        onSuccess: this.handleSuccess,
        onFailure: this.handleFailure,
      }
    );
  }
  handleSuccess = response => {
    const {router} = this.context;
    const organizationId = response.createOrganization.organizationEdge.node.rowId;
    router.push({
      pathname: `/profile/join-organization/${organizationId}`,
      state: {
        isAdmin: true,
      },
    });
  }
  handleFailure = transaction => {
    const error = transaction.getError() || new Error('Mutation failed.');
    this.setState({ error: !!error });
  }
  render () {
    const {error} = this.state;
    return <ActionPanelForm
      title={'New Organization'}
      notifyClose={this.props.notifyClose}
      onValidSubmit={this.handleSubmit}
      error={error}
    >
      <TextInput
        name={'name'}
        label={'Name'}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/}}
        required
      />
      <TextInput
        name={'location'}
        label={'Location'}
        validations={{matchRegexp: /[A-Za-z,0-9]*/}}
        required
      />
      <TextInput
        name={'description'}
        label={'Description'}
        validations={{matchRegexp: /[A-Za-z,\.0-9]*/, maxLength: 500}}
        required
        multiLine
        rows={3}
      />
      <TextInput
        name={'imageUrl'}
        label={'Image'}
        validations={'isUrl'}
      />
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(CreateOrganizationForm, {
  initialVariables: {
    userId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${CreateOrganizationMutation.getFragment('user')},
        ${CreateOrganizationMemberMutation.getFragment('user')},
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        ${CreateOrganizationMutation.getFragment('query')},
      }
    `,
  },
});
