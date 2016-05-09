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

import {ProjectType, ProjectConnection} from './ProjectType';
import {UserType, UserConnection} from './UserType';
import {ResourceType, ResourceConnection} from './ResourceType';

export const TaskType = registerType(new GraphQLObjectType({
  name: 'Task',
  description: 'A project subtask.',
  fields: () => ({
    id: globalIdField('Task'),
    name: {
      type: GraphQLString,
      description: 'A subtask\'s title.',
    },
    description: {
      type: GraphQLString,
      description: 'A project subtask\'s status',
    },
    category: {
      type: GraphQLString,
      description: 'A project subtask\'s specification.',
    },
    projects: {
      type: ProjectConnection,
      description: 'A subtask\'s parent project.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const projectPromises = _.projects.map(p => getItem(getEndpoint(ProjectType), p.id));
        const projectResults = await* projectPromises;
        return connectionFromArray(
          projectResults,
          args
        );
      },

    },
    users: {
      type: UserConnection,
      description: 'A project subtask\'s roster.',
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
    resources: {
      type: ResourceConnection,
      description: 'A project subtask\'s list of economic inputs.',
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
      description: 'A project subtask\'s list of pending economic inputs.',
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
  connectionType: TaskConnection,
  edgeType: TaskEdge,
} = connectionDefinitions({
  name: 'Task',
  nodeType: TaskType,
});
