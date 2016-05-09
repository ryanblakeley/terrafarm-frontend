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
import {TaskType, TaskEdge} from '../types/TaskType';

const resourceEndpoint = getEndpoint(ResourceType);
const taskEndpoint = getEndpoint(TaskType);

export default mutationWithClientMutationId({
  name: 'AddResourceToTask',
  inputFields: {
    resourceId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    taskEdge: {
      type: TaskEdge,
      resolve: async ({localResourceId, localTaskId}) => {
        const resource = await getItem(resourceEndpoint, localResourceId);
        const taskPromises = resource.tasks.map(g => getItem(taskEndpoint, g.id));
        const taskResults = await* taskPromises;
        const offset = taskResults.findIndex(g => g.id == localTaskId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: taskResults[offset],
        };
      },
    },
    resourceEdge: {
      type: ResourceEdge,
      resolve: async ({localTaskId, localResourceId}) => {
        const task = await getItem(taskEndpoint, localTaskId);
        const resourcePromises = task.resources.map(r => getItem(resourceEndpoint, r.id));
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
    task: {
      type: TaskType,
      resolve: async ({localTaskId}) => await getItem(taskEndpoint, localTaskId),
    },
  },
  mutateAndGetPayload: async ({resourceId, taskId}) => {
    const localResourceId = fromGlobalId(resourceId).id;
    const localTaskId = fromGlobalId(taskId).id;
    const resource = await getItem(resourceEndpoint, localResourceId);

    resource.tasks.push({id: localTaskId});

    return await updateItem(resourceEndpoint, localResourceId, {
      tasks: resource.tasks,
    }).then(() => {
      return { localResourceId, localTaskId };
    });
  },
});
