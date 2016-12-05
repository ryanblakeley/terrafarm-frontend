import React from 'react';
import Relay from 'react-relay';
import MenuItem from 'material-ui/MenuItem';
import ActionPanelForm from '../../shared/components/ActionPanelForm';
import SelectInput from '../../shared/components/SelectInput';
import CreateOrganizationMemberMutation from '../mutations/CreateOrganizationMemberMutation';

class OfferMemberForm extends React.Component {
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
    const isMember = !!organization.organizationMembersByOrganizationId.edges.findIndex(edge => (
      edge.node.userByMemberId.rowId === currentPerson.rowId
    )) > -1;
    this.setState({authorized: isMember});
  }
  handleSubmit = data => {
    const {organization} = this.props;

    Relay.Store.commitUpdate(
      new CreateOrganizationMemberMutation({
        organization,
        user: data.user,
        isAdmin: data.isAdmin,
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
    const {error, authorized} = this.state;

    return <ActionPanelForm
      title={'New Member'}
      notifyClose={notifyClose}
      onValidSubmit={this.handleSubmit}
      onDelete={this.handleDelete}
      error={error}
      showForm={authorized}
    >
      <SelectInput
        name={'user'}
        label={'Users you starred'}
        required
      >
        {currentPerson.userStarsByFollowerId.edges.map(edge => <MenuItem
          value={edge.node.userByFollowingId}
          key={edge.node.userByFollowingId.id}
          primaryText={edge.node.userByFollowingId.name}
        />)}
      </SelectInput>
    </ActionPanelForm>;
  }
}

export default Relay.createContainer(OfferMemberForm, {
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
        ${CreateOrganizationMemberMutation.getFragment('organization')},
      }
    `,
    currentPerson: () => Relay.QL`
      fragment on User {
        rowId,
        userStarsByFollowerId(first: 10) {
          edges {
            node {
              userByFollowingId {
                id,
                name,
                ${CreateOrganizationMemberMutation.getFragment('user')},
              }
            }
          }
        },
      }
    `,
  },
});
