import Relay from 'react-relay';

export default class RemoveResourceFromLandMutation extends Relay.Mutation {
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
    return Relay.QL`mutation{removeResourceFromLand}`;
  }
  getFatQuery () {
    return Relay.QL`
      fragment on RemoveResourceFromLandPayload {
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
        connectionName: 'lands',
        deletedIDFieldName: 'removedLandID',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'land',
        parentID: this.props.land.id,
        connectionName: 'resources',
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


