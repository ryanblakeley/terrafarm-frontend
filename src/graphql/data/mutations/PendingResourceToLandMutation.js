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

import {ResourceType, ResourceEdge} from '../types/ResourceType';
import {LandType, LandEdge} from '../types/LandType';

const resourceEndpoint = getEndpoint(ResourceType);
const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'PendingResourceToLand',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    landEdge: {
      type: LandEdge,
      resolve: async ({localResourceId, localLandId}) => {
        const resource = await getItem(resourceEndpoint, localResourceId);
        const landPromises = resource.lands_pending.map(g => getItem(landEndpoint, g.id));
        const landResults = await* landPromises;
        const offset = landResults.findIndex(g => g.id == localLandId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: landResults[offset],
        };
      },
    },
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localResourceId, localLandId}) => {
        const land = await getItem(landEndpoint, localLandId);
        const resourcePromises = land.resources_pending.map(r => getItem(resourceEndpoint, r.id));
        const resourceResults = await* resourcePromises;
        const offset = resourceResults.findIndex(r => r.id == localResourceId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: resourceResults[offset],
        };
      },
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
  mutateAndGetPayload: async ({resourceId, landId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localLandId = fromGlobalId(landId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);
    resource.lands_pending.push({id: localLandId});

    return await updateItem(resourceEndpoint, localResourceId, {
      lands_pending: resource.lands_pending,
    }).then(() => {
      return { localResourceId, localLandId };
    });
  },
});


