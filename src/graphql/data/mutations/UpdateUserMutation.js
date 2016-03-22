import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {UserType} from '../types/UserType';

const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'UpdateUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'userAttributes',
        fields: {
          name: { type: GraphQLString },
          location: { type: GraphQLString },
          description: { type: GraphQLString },
          image: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localUserId = fromGlobalId(id).id;

    return await updateItem(userEndpoint, localUserId, attributes)
      .then(result => {
        return {localUserId: result.id};
      });
  },
});
