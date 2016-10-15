import Relay from 'react-relay';

export default class UpdateUserMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{updateUser}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UpdateUserPayload {
        user {
          name,
          location,
          description,
          imageUrl,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {userPatch} = this.props;
    const {name, location, description, imageUrl} = userPatch;

    return {
      user: {
        name,
        location,
        description,
        imageUrl,
      },
    };
  }
  getConfigs () {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.user.id,
        },
      },
    ];
  }
  getVariables () {
    return {
      id: this.props.user.id,
      userPatch: this.props.userPatch,
    };
  }
}
