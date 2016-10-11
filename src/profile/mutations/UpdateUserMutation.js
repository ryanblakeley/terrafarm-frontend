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
          image,
        },
      }
    `;
  }
  getOptimisticResponse () {
    const {attributes} = this.props;
    const {name, location, description, image} = attributes;

    return {
      viewer: {
        name,
        location,
        description,
        image,
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
      attributes: this.props.attributes,
    };
  }
}
