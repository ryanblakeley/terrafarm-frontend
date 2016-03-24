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
import deleteItem from '../api/deleteItem';

import {ResourceType} from '../types/ResourceType';
import MasterType from '../types/MasterType';
import {UserType} from '../types/UserType';

const resourceEndpoint = getEndpoint(ResourceType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'DeleteResource',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedResourceID: {
      type: GraphQLID,
      resolve: ({resourceId}) => resourceId,
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({resourceId, userId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localUserId = fromGlobalId(userId).id;

    return await deleteItem(resourceEndpoint, localResourceId).then(() => {
      return { localUserId, resourceId };
    });
  },
});
