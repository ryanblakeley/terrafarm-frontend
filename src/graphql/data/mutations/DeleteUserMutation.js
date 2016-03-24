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

import {UserType} from '../types/UserType';
import MasterType from '../types/MasterType';

const userEndpoint = getEndpoint(UserType);
const masterEndpoint = getEndpoint(MasterType);

export default mutationWithClientMutationId({
  name: 'DeleteUser',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedUserID: {
      type: GraphQLID,
      resolve: ({userId}) => userId,
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({userId}) => {
    const localUserId = fromGlobalId(userId).id;

    return await deleteItem(userEndpoint, localUserId).then(() => {
      return { userId };
    });
  },
});
