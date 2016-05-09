import Relay from 'react-relay';

export default class UnlikeLandMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    land: () => Relay.QL`
      fragment on Land {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{unlikeLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on UnlikeLandPayload {
        removedLandID,
        removedUserID,
        user,
        land,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'landsLiked',
        deletedIDFieldName: 'removedLandID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'likedBy',
        deletedIDFieldName: 'removedUserID',
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      landId: this.props.land.id,
    };
  }
}
