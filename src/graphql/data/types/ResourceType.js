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

import {UserType, UserConnection} from './UserType';
import {LandType, LandConnection} from './LandType';
import {TaskType, TaskConnection} from './TaskType';
import {ProjectType, ProjectConnection} from './ProjectType';

export const ResourceType = registerType(new GraphQLObjectType({
  name: 'Resource',
  description: 'An economic input.',
  fields: () => ({
    id: globalIdField('Resource'),
    name: {
      type: GraphQLString,
      description: 'An economic resource\'s name.',
    },
    description: {
      type: GraphQLString,
      description: 'An economic resource\'s access availability.',
    },
    category: {
      type: GraphQLString,
      description: 'An economic resource\'s category',
    },
    image: {
      type: GraphQLString,
      description: 'An economic input\'s image url.',
    },
    users: {
      type: UserConnection,
      description: 'An economic input\'s list of owners.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const userPromises = _.users.map(u => getItem(getEndpoint(UserType), u.id));
        const userResults = await* userPromises;
        return connectionFromArray(
          userResults,
          args
        );
      },
    },
    likedBy: {
      type: UserConnection,
      description: 'A list of people who have liked an economic input.',
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
    lands: {
      type: LandConnection,
      description: 'An economic input\'s list of lands with access.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const landPromises = _.lands.map(g => getItem(getEndpoint(LandType), g.id));
        const landResults = await* landPromises;
        return connectionFromArray(
          landResults,
          args
        );
      },
    },
    landsPending: {
      type: LandConnection,
      description: 'An economic input\'s list of pending land commitments.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const landPromises = _.lands_pending.map(u => getItem(getEndpoint(LandType), u.id));
        const landResults = await* landPromises;
        return connectionFromArray(
          landResults,
          args
        );
      },
    },
    tasks: {
      type: TaskConnection,
      description: 'An economic input\'s task commitment list.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const taskPromises = _.tasks.map(g => getItem(getEndpoint(TaskType), g.id));
        const taskResults = await* taskPromises;
        return connectionFromArray(
          taskResults,
          args
        );
      },
    },
    tasksPending: {
      type: TaskConnection,
      description: 'An economic input\'s list of pending task commitments.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const taskPromises = _.tasks_pending.map(t => getItem(getEndpoint(TaskType), t.id));
        const taskResults = await* taskPromises;
        return connectionFromArray(
          taskResults,
          args
        );
      },
    },
    projects: {
      type: ProjectConnection,
      description: 'An economic input\'s project commitment list.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const projectPromises = _.projects.map(g => getItem(getEndpoint(ProjectType), g.id));
        const projectResults = await* projectPromises;
        return connectionFromArray(
          projectResults,
          args
        );
      },
    },
    projectsPending: {
      type: ProjectConnection,
      description: 'An economic input\'s list of pending project commitments.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const projectPromises = _.projects_pending.map(t => getItem(getEndpoint(ProjectType), t.id));
        const projectResults = await* projectPromises;
        return connectionFromArray(
          projectResults,
          args
        );
      },
    },
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: ResourceConnection,
  edgeType: ResourceEdge,
} = connectionDefinitions({
  name: 'Resource',
  nodeType: ResourceType,
});

