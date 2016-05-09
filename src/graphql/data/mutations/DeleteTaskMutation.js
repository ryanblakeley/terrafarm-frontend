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

import {TaskType} from '../types/TaskType';
import MasterType from '../types/MasterType';

const taskEndpoint = getEndpoint(TaskType);
const masterEndpoint = getEndpoint(MasterType);

export default mutationWithClientMutationId({
  name: 'DeleteTask',
  inputFields: {
    taskId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedTaskID: {
      type: GraphQLID,
      resolve: ({taskId}) => taskId,
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({taskId}) => {
    const localTaskId = fromGlobalId(taskId).id;

    return await deleteItem(taskEndpoint, localTaskId).then(() => {
      return { taskId };
    });
  },
});
