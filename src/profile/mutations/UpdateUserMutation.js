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
          placeByPlaceId,
          description,
          imageUrl,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {userPatch} = this.props;

    return {
      user: {...userPatch},
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
