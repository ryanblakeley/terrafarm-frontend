import Relay from 'react-relay';

export default class CreateProjectMutation extends Relay.Mutation {
  static fragments = {
    organization: () => Relay.QL`
      fragment on Organization {
        id,
        rowId,
      }
    `,
    query: () => Relay.QL`
      fragment on Query {
        id,
      }
    `,
  };
  getMutation () {
    return Relay.QL`mutation{createProject}`;
  }
  getVariables () {
    return {
      project: Object.assign({
        organizationId: this.props.organization.rowId,
      }, this.props.projectData),
    };
  }
  getFatQuery () {
    return Relay.QL`
      fragment on CreateProjectPayload {
        projectEdge,
        project,
        organizationByOrganizationId,
        query {
          allOrganizations,
        },
      }
    `;
  }
  getConfigs () {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'query',
        parentID: this.props.query.id,
        connectionName: 'allProjects',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'organizationByOrganizationId',
        parentID: this.props.organization.id,
        connectionName: 'projectsByOrganizationId',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      /*
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'projectsAdmin',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      {
        type: 'RANGE_ADD',
        parentName: 'user',
        parentID: this.props.user.id,
        connectionName: 'projectsLiked',
        edgeName: 'projectEdge',
        rangeBehaviors: {
          '': 'append',
        },
      },
      */
    ];
  }
}
