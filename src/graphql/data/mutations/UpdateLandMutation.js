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

import {LandType} from '../types/LandType';

const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'UpdateLand',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'landAttributes',
        fields: {
          name: { type: GraphQLString },
          location: { type: GraphQLString },
          description: { type: GraphQLString },
          category: { type: GraphQLString },
          image: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    land: {
      type: LandType,
      resolve: async ({localLandId}) => await getItem(landEndpoint, localLandId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localLandId = fromGlobalId(id).id;

    return await updateItem(landEndpoint, localLandId, attributes)
      .then(result => {
        return {localLandId: result.id};
      });
  },
});

