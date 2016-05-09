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

import {TaskType} from '../types/TaskType';

const taskEndpoint = getEndpoint(TaskType);

export default mutationWithClientMutationId({
  name: 'UpdateTask',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    attributes: {
      type: new GraphQLInputObjectType({
        name: 'taskAttributes',
        fields: {
          name: { type: GraphQLString },
          category: { type: GraphQLString },
          description: { type: GraphQLString },
        },
      }),
    },
  },
  outputFields: {
    task: {
      type: TaskType,
      resolve: async ({localTaskId}) => await getItem(taskEndpoint, localTaskId),
    },
  },
  mutateAndGetPayload: async ({id, attributes}) => {
    const localTaskId = fromGlobalId(id).id;

    return await updateItem(taskEndpoint, localTaskId, attributes)
      .then(result => {
        return {localTaskId: result.id};
      });
  },
});
