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
import {ResourceType, ResourceEdge} from '../types/ResourceType';

const userEndpoint = getEndpoint(UserType);
const resourceEndpoint = getEndpoint(ResourceType);

export default mutationWithClientMutationId({
  name: 'LikeResource',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localUserId, localResourceId}) => {
        const user = await getItem(userEndpoint, localUserId);
        const resourcePromises = user.resources_liked.map(g => getItem(resourceEndpoint, g.id));
        const resourceResults = await* resourcePromises;
        const offset = resourceResults.findIndex(g => g.id == localResourceId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: resourceResults[offset],
        };
      },
    },
    userEdge: {
      type: UserEdge,
      resolve: async ({localResourceId, localUserId}) => {
        const resource = await getItem(resourceEndpoint, localResourceId);
        const userPromises = resource.liked_by.map(r => getItem(userEndpoint, r.id));
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
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
  },
  mutateAndGetPayload: async ({userId, resourceId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localResourceId = fromGlobalId(resourceId).id;
    const user = await getItem(userEndpoint, localUserId);

    user.resources_liked.push({id: localResourceId});

    return await updateItem(userEndpoint, localUserId, {
      resources_liked: user.resources_liked,
    }).then(() => {
      return { localUserId, localResourceId };
    });
  },
});
