import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {ResourceType} from '../types/ResourceType';
import {ProjectType} from '../types/ProjectType';

const resourceEndpoint = getEndpoint(ResourceType);
const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'RemovePendingResourceToProject',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
    },
    removedProjectID: {
      type: GraphQLID,
      resolve: ({localProjectId}) => localProjectId,
    },
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
    project: {
      type: ProjectType,
      resolve: async ({localProjectId}) => await getItem(projectEndpoint, localProjectId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({resourceId, projectId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localProjectId = fromGlobalId(projectId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);
    const projectIndex = resource.projects_pending.findIndex(g => g.id == localProjectId);

    resource.projects_pending.splice(projectIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      projects_pending: resource.projects_pending,
    }).then(() => {
      return { localResourceId, localProjectId };
    });
  },
});


