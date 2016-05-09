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

import {UserType, UserEdge} from '../types/UserType';
import {ProjectType, ProjectEdge} from '../types/ProjectType';

const userEndpoint = getEndpoint(UserType);
const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'LikeProject',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    projectEdge: {
      type: ProjectEdge,
      resolve: async ({localUserId, localProjectId}) => {
        const user = await getItem(userEndpoint, localUserId);
        const projectPromises = user.projects_liked.map(g => getItem(projectEndpoint, g.id));
        const projectResults = await* projectPromises;
        const offset = projectResults.findIndex(g => g.id == localProjectId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: projectResults[offset],
        };
      },
    },
    userEdge: {
      type: UserEdge,
      resolve: async ({localProjectId, localUserId}) => {
        const project = await getItem(projectEndpoint, localProjectId);
        const userPromises = project.liked_by.map(r => getItem(userEndpoint, r.id));
        const userResults = await* userPromises;
        const offset = userResults.findIndex(r => r.id == localUserId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: userResults[offset],
        };
      },
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    project: {
      type: ProjectType,
      resolve: async ({localProjectId}) => await getItem(projectEndpoint, localProjectId),
    },
  },
  mutateAndGetPayload: async ({userId, projectId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localProjectId = fromGlobalId(projectId).id;
    const user = await getItem(userEndpoint, localUserId);

    user.projects_liked.push({id: localProjectId});

    return await updateItem(userEndpoint, localUserId, {
      projects_liked: user.projects_liked,
    }).then(() => {
      return { localUserId, localProjectId };
    });
  },
});
