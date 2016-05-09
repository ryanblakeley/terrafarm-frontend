import Relay from 'react-relay';

export default class NewLandMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    master: () => Relay.QL`
      fragment on Master {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{newLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on NewLandPayload {
        landEdge,
        master {
          lands,
        },
        user {
          landsAdmin,
          landsLiked,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'master',
        parentID: this.props.master.id,
        connectionName: 'lands',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'landsAdmin',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'landsLiked',
        edgeName: 'landEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
    ];
  }
  getVariables () {
    return {
      userId: this.props.user.id,
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
    };
  }
}

