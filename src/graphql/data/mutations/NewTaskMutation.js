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

import {UserType} from '../types/UserType';
import {TaskType, TaskEdge} from '../types/TaskType';
import MasterType from '../types/MasterType';

const taskEndpoint = getEndpoint(TaskType);
const masterEndpoint = getEndpoint(MasterType);
const userEndpoint = getEndpoint(UserType);

export default mutationWithClientMutationId({
  name: 'NewTask',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
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
    user: {
      type: UserType,
      resolve: async ({localUserId}) => await getItem(userEndpoint, localUserId),
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(masterEndpoint, 1),
    },
  },
  mutateAndGetPayload: async ({userId, name, description, category, image}) => {
    const localUserId = fromGlobalId(userId).id;

    return await createItem(taskEndpoint, {
      name,
      description,
      category,
      image,
      admins: [{id: localUserId}],
      resources: [],
      projects: [],
      masters: [{id: 1}],
    }).then(result => {
      return {
        localTaskId: result.id,
        localUserId,
      };
    });
  },
});

