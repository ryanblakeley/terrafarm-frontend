import Relay from 'react-relay';

export default class RemovePendingResourceToLandMutation extends Relay.Mutation {
  static fragments = {
    resource: () => Relay.QL`
      fragment on Resource {
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
    return Relay.QL`mutation{removePendingResourceToLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemovePendingResourceToLandPayload {
        removedLandID,
        removedResourceID,
        resource,
        land,
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'resource',
        parentID: this.props.resource.id,
        connectionName: 'landsPending',
        deletedIDFieldName: 'removedLandID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'resourcesPending',
        deletedIDFieldName: 'removedResourceID',
      },
    ];
  }
  getVariables () {
    return {
      resourceId: this.props.resource.id,
      landId: this.props.land.id,
    };
  }
}

