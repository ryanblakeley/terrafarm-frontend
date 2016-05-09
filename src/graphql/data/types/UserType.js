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

import {ResourceType, ResourceConnection} from './ResourceType';
import {LandType, LandConnection} from './LandType';
import {TaskType, TaskConnection} from './TaskType';
import {ProjectType, ProjectConnection} from './ProjectType';

export const UserType = registerType(new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app.',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'A person\'s name.',
    },
    email: {
      type: GraphQLString,
      description: 'A person\'s email address.',
    },
    location: {
      type: GraphQLString,
      description: 'A person\'s physical location.',
    },
    description: {
      type: GraphQLString,
      description: 'A person\'s description of his or her intention.',
    },
    image: {
      type: GraphQLString,
      description: 'A person\'s image url.',
    },
    resources: {
      type: ResourceConnection,
      description: 'A person\'s list of economic inputs.',
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
    resourcesLiked: {
      type: ResourceConnection,
      description: 'A list of resources that a person has liked.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const resourcePromises = _.resources_liked.map(g => getItem(getEndpoint(ResourceType), g.id));
        const resourceResults = await* resourcePromises;
        return connectionFromArray(
          resourceResults,
          args
        );
      },
    },
    landsAdmin: {
      type: LandConnection,
      description: 'A list of lands in which a person is a decision maker.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const landPromises = _.lands_admin.map(g => getItem(getEndpoint(LandType), g.id));
        const landResults = await* landPromises;
        return connectionFromArray(
          landResults,
          args
        );
      },
    },
    landsLiked: {
      type: LandConnection,
      description: 'A list of lands that a person has liked.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const landPromises = _.lands_liked.map(g => getItem(getEndpoint(LandType), g.id));
        const landResults = await* landPromises;
        return connectionFromArray(
          landResults,
          args
        );
      },
    },
    projectsAdmin: {
      type: ProjectConnection,
      description: 'A list of projects which a person is an admin .',
      args: connectionArgs,
      resolve: async (_, args) => {
        const projectPromises = _.projects_admin.map(g => getItem(getEndpoint(ProjectType), g.id));
        const projectResults = await* projectPromises;
        return connectionFromArray(
          projectResults,
          args
        );
      },
    },
    projectsLiked: {
      type: ProjectConnection,
      description: 'A list of projects that a person has liked.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const projectPromises = _.projects_liked.map(g => getItem(getEndpoint(ProjectType), g.id));
        const projectResults = await* projectPromises;
        return connectionFromArray(
          projectResults,
          args
        );
      },
    },
    tasks: {
      type: TaskConnection,
      description: 'An person\'s task assignment list.',
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
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
