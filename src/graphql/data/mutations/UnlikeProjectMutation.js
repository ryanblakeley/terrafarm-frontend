import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType} from '../types/UserType';
import {ProjectType} from '../types/ProjectType';

const userEndpoint = getEndpoint(UserType);
const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'UnlikeProject',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    projectId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedProjectID: {
      type: GraphQLID,
      resolve: ({localProjectId}) => localProjectId,
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
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({userId, projectId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localProjectId = fromGlobalId(projectId).id;
    const user = await getItem(userEndpoint, localUserId);
    const projectIndex = user.projects_liked.findIndex(g => g.id == localProjectId);

    user.projects_liked.splice(projectIndex, 1);

    return await updateItem(userEndpoint, localUserId, {
      projects_liked: user.projects_liked,
    }).then(() => {
      return { localUserId, localProjectId };
    });
  },
});
