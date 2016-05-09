import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';

import {registerType, getEndpoint} from './registry';
import {nodeInterface} from './node';

import getItem from '../api/getItem';

import {LandType, LandConnection} from './LandType';
import {UserType, UserConnection} from './UserType';
import {TaskType, TaskConnection} from './TaskType';
import {ResourceType, ResourceConnection} from './ResourceType';

export const ProjectType = registerType(new GraphQLObjectType({
  name: 'Project',
  description: 'A cultivation project.',
  fields: () => ({
    id: globalIdField('Project'),
    name: {
      type: GraphQLString,
      description: 'A cultivation project\'s name.',
    },
    description: {
      type: GraphQLString,
      description: 'A cultivation project\'s description.',
    },
    category: {
      type: GraphQLString,
      description: 'A cultivation project\'s priority level.',
    },
    lands: {
      type: LandConnection,
      description: 'A cultivation project\'s host land.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const landPromises = _.lands.map(l => getItem(getEndpoint(LandType), l.id));
        const landResults = await* landPromises;
        return connectionFromArray(
          landResults,
          args
        );
      },
    },
    admins: {
      type: UserConnection,
      description: 'A project\'s list of administrators.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const adminPromises = _.admins.map(a => getItem(getEndpoint(UserType), a.id));
        const adminResults = await* adminPromises;
        return connectionFromArray(
          adminResults,
          args,
        );
      },
    },
    likedBy: {
      type: UserConnection,
      description: 'A cultivation project\'s list of people who have liked it.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const userPromises = _.liked_by.map(u => getItem(getEndpoint(UserType), u.id));
        const userResults = await* userPromises;
        return connectionFromArray(
          userResults,
          args
        );
      },
    },
    tasks: {
      type: TaskConnection,
      description: 'A cultivation project\'s subtask.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const taskPromises = _.tasks.map(t => getItem(getEndpoint(TaskType), t.id));
        const taskResults = await* taskPromises;
        return connectionFromArray(
          taskResults,
          args
        );
      },
    },
    resources: {
      type: ResourceConnection,
      description: 'An area of land\'s list of economic inputs.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const resourcePromises = _.resources.map(r => getItem(getEndpoint(ResourceType), r.id));
        const resourceResults = await* resourcePromises;
        return connectionFromArray(
          resourceResults,
          args
        );
      },
    },
    resourcesPending: {
      type: ResourceConnection,
      description: 'An area of land\'s list of pending economic inputs.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const resourcePromises = _.resources_pending.map(r => getItem(getEndpoint(ResourceType), r.id));
        const resourceResults = await* resourcePromises;
        return connectionFromArray(
          resourceResults,
          args
        );
      },
    },
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: ProjectConnection,
  edgeType: ProjectEdge,
} = connectionDefinitions({
  name: 'Project',
  nodeType: ProjectType,
});
