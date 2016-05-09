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

import {ResourceType} from '../types/ResourceType';
import {LandType} from '../types/LandType';

const resourceEndpoint = getEndpoint(ResourceType);
const landEndpoint = getEndpoint(LandType);

export default mutationWithClientMutationId({
  name: 'RemoveResourceFromLand',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    landId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedLandID: {
      type: GraphQLID,
      resolve: ({localLandId}) => localLandId,
    },
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
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
    const landIndex = resource.lands.findIndex(g => g.id == localLandId);

    resource.lands.splice(landIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      lands: resource.lands,
    }).then(() => {
      return { localResourceId, localLandId };
    });
  },
});

