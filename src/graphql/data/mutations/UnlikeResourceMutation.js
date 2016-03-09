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
import {ResourceType} from '../types/ResourceType';

const userEndpoint = getEndpoint(UserType);
const resourceEndpoint = getEndpoint(ResourceType);

export default mutationWithClientMutationId({
  name: 'UnlikeResource',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({localUserId}) => localUserId,
    },
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
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
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({userId, resourceId}) => {
    const localUserId = fromGlobalId(userId).id;
    const localResourceId = fromGlobalId(resourceId).id;
    const user = await getItem(userEndpoint, localUserId);
    const resourceIndex = user.resources_liked.findIndex(g => g.id == localResourceId);

    user.resources_liked.splice(resourceIndex, 1);

    return await updateItem(userEndpoint, localUserId, {
      resources_liked: user.resources_liked,
    }).then(() => {
      return { localUserId, localResourceId };
    });
  },
});

