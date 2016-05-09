import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import updateItem from '../api/updateItem';

import {ResourceType} from '../types/ResourceType';
import {LandType} from '../types/LandType';

const resourceEndpoint = getEndpoint(ResourceType);
const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'RemovePendingResourceToLand',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
    },
    removedLandID: {
      type: GraphQLID,
      resolve: ({localLandId}) => localLandId,
    },
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
    land: {
      type: LandType,
      resolve: async ({localLandId}) => await getItem(landEndpoint, localLandId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({resourceId, landId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localLandId = fromGlobalId(landId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);
    const landIndex = resource.lands_pending.findIndex(g => g.id == localLandId);

    resource.lands_pending.splice(landIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      lands_pending: resource.lands_pending,
    }).then(() => {
      return { localResourceId, localLandId };
    });
  },
});


