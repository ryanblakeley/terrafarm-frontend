import Relay from 'react-relay';

export default class DeleteOrganizationMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteOrganization}`;
  }
  getVariables () {
    return {
      id: this.props.organization.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteOrganizationPayload {
        deletedOrganizationId,
        query {
          allOrganizations,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allOrganizations',
        deletedIDFieldName: 'deletedOrganizationId',
      },
    ];
  }
}
