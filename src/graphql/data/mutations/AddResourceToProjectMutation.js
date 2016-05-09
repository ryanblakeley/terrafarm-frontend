import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {ResourceType, ResourceEdge} from '../types/ResourceType';
import {ProjectType, ProjectEdge} from '../types/ProjectType';

const resourceEndpoint = getEndpoint(ResourceType);
const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'AddResourceToProject',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    projectEdge: {
      type: ProjectEdge,
      resolve: async ({localResourceId, localProjectId}) => {
        const resource = await getItem(resourceEndpoint, localResourceId);
        const projectPromises = resource.projects.map(g => getItem(projectEndpoint, g.id));
        const projectResults = await* projectPromises;
        const offset = projectResults.findIndex(g => g.id == localProjectId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: projectResults[offset],
        };
      },
    },
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localProjectId, localResourceId}) => {
        const project = await getItem(projectEndpoint, localProjectId);
        const resourcePromises = project.resources.map(r => getItem(resourceEndpoint, r.id));
        const resourceResults = await* resourcePromises;
        const offset = resourceResults.findIndex(r => r.id == localResourceId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: resourceResults[offset],
        };
      },
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
  mutateAndGetPayload: async ({resourceId, projectId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localProjectId = fromGlobalId(projectId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);

    resource.projects.push({id: localProjectId});

    return await updateItem(resourceEndpoint, localResourceId, {
      projects: resource.projects,
    }).then(() => {
      return { localResourceId, localProjectId };
    });
  },
});
