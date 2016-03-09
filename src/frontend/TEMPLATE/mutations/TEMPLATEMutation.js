import Relay from 'react-relay';

export default class TEMPLATEMutation extends Relay.Mutation {
  static fragments = {
    PROP: () => Relay.QL`
      fragment on PROP {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{TEMPLATE_MUTATION_NAME}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on TEMPLATEPayload {
        PROP,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'PARENT_NAME',
        parentID: this.props.PROP.id,
        connectionName: 'CONNECTION_NAME',
        edgeName: 'CONNECTION_NAMEEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
          fragment on TEMPLATEPayload {
            CONNECTION_NAMEEdge,
          }
        `],
      },
    ];
  }
  getVariables () {
    return {
      propId: this.props.PROP.id,
    };
  }
}
