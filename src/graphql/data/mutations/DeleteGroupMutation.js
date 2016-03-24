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

import {GroupType} from '../types/GroupType';
import MasterType from '../types/MasterType';
import {UserType} from '../types/UserType';

const groupEndpoint = getEndpoint(GroupType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'DeleteGroup',
  inputFields: {
    groupId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedGroupID: {
      type: GraphQLID,
      resolve: ({groupId}) => groupId,
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
  mutateAndGetPayload: async ({groupId, userId}) => {
    const localGroupId = fromGlobalId(groupId).id;
    const localUserId = fromGlobalId(userId).id;

    return await deleteItem(groupEndpoint, localGroupId).then(() => {
      return { localUserId, groupId };
    });
  },
});
