import React from 'react';
import Relay from 'react-relay';
import CreateOrganizationMemberMutation from './mutations/CreateOrganizationMemberMutation';

class JoinOrganizationContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    organization: React.PropTypes.object,
  };
  static contextTypes = {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  componentWillMount () {
    const {user, organization} = this.props;
    const {router, location} = this.context;

    Relay.Store.commitUpdate(
      new CreateOrganizationMemberMutation({
        user,
        organization,
        isAdmin: !!location.state.isAdmin,
      }), {
        onSuccess: response => {
          router.replace(`/organization/${organization.rowId}`);
        },
      }
    );
  }
  render () {
    console.log('Joining organization...');
    return null;
  }
}

export default Relay.createContainer(JoinOrganizationContainer, {
  initialVariables: {
    userId: null,
    organizationId: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${CreateOrganizationMemberMutation.getFragment('user')},
      }
    `,
    organization: () => Relay.QL`
      fragment on Organization {
        rowId,
        ${CreateOrganizationMemberMutation.getFragment('organization')},
      }
    `,
  },
});
