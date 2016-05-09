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

import {ProjectType} from '../types/ProjectType';

const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'UpdateProject',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'projectAttributes',
        fields: {
          name: { type: GraphQLString },
          category: { type: GraphQLString },
          description: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    project: {
      type: ProjectType,
      resolve: async ({localProjectId}) => await getItem(projectEndpoint, localProjectId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localProjectId = fromGlobalId(id).id;

    return await updateItem(projectEndpoint, localProjectId, attributes)
      .then(result => {
        return {localProjectId: result.id};
      });
  },
});
