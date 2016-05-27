import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import {
  fromGlobalId,
  offsetToCursor,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {getEndpoint} from '../types/registry';

import getItem from '../api/getItem';
import createItem from '../api/createItem';

import {ProjectType} from '../types/ProjectType';
import {TaskType, TaskEdge} from '../types/TaskType';
import MasterType from '../types/MasterType';

const taskEndpoint = getEndpoint(TaskType);
const masterEndpoint = getEndpoint(MasterType);
const projectEndpoint = getEndpoint(ProjectType);

export default mutationWithClientMutationId({
  name: 'NewTask',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
  },
  /* eslint eqeqeq: 0 */
  outputFields: {
    taskEdge: {
      type: TaskEdge,
      resolve: async ({localTaskId}) => {
        const master = await getItem(masterEndpoint, 1);
        const taskPromises = master.tasks.map(r => getItem(taskEndpoint, r.id));
        const taskResults = await* taskPromises;
        const offset = taskResults.findIndex(r => r.id == localTaskId);
        const cursor = offsetToCursor(offset);
        return {
          cursor: cursor,
          node: taskResults[offset],
        };
      },
    },
    project: {
      type: ProjectType,
      resolve: async ({localProjectId}) => await getItem(projectEndpoint, localProjectId),
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  mutateAndGetPayload: async ({projectId, name, description, category}) => {
    const localProjectId = fromGlobalId(projectId).id;

    return await createItem(taskEndpoint, {
      name,
      description,
      category,
      projects: [{id: localProjectId}],
      resources: [],
      resources_pending: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localTaskId: result.id,
        localProjectId,
      };
    });
  },
});

