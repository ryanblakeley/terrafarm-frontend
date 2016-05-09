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
import {TaskType} from '../types/TaskType';

const resourceEndpoint = getEndpoint(ResourceType);
const taskEndpoint = getEndpoint(TaskType);

export default mutationWithClientMutationId({
  name: 'RemovePendingResourceToTask',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    removedResourceID: {
      type: GraphQLID,
      resolve: ({localResourceId}) => localResourceId,
    },
    removedTaskID: {
      type: GraphQLID,
      resolve: ({localTaskId}) => localTaskId,
    },
    resource: {
      type: ResourceType,
      resolve: async ({localResourceId}) => await getItem(resourceEndpoint, localResourceId),
    },
    task: {
      type: TaskType,
      resolve: async ({localTaskId}) => await getItem(taskEndpoint, localTaskId),
    },
  },
  /* eslint eqeqeq: 0 */
  mutateAndGetPayload: async ({resourceId, taskId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localTaskId = fromGlobalId(taskId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);
    const taskIndex = resource.tasks_pending.findIndex(g => g.id == localTaskId);

    resource.tasks_pending.splice(taskIndex, 1);

    return await updateItem(resourceEndpoint, localResourceId, {
      tasks_pending: resource.tasks_pending,
    }).then(() => {
      return { localResourceId, localTaskId };
    });
  },
});


