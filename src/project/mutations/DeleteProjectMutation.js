import Relay from 'react-relay';

export default class DeleteProjectMutation extends Relay.Mutation {
  static fragments = {
    project: () => Relay.QL`
      fragment on Project {
        id,
        organizationByOrganizationId {
          id,
        },
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{deleteProject}`;
  }
  getVariables () {
    return {
      id: this.props.project.id,
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on DeleteProjectPayload {
        deletedProjectId,
        organizationByOrganizationId,
        query {
          allProjects,
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
        connectionName: 'allProjects',
        deletedIDFieldName: 'deletedProjectId',
      },
      {
        type: 'NODE_DELETE',
        parentName: 'organizationByOrganizationId',
        parentID: this.props.project.organizationByOrganizationId.id,
        connectionName: 'projectsByOrganizationId',
        deletedIDFieldName: 'deletedProjectId',
      },
    ];
  }
}
