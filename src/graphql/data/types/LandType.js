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
import {ResourceType, ResourceConnection} from './ResourceType';
import {ProjectType, ProjectConnection} from './ProjectType';

export const LandType = registerType(new GraphQLObjectType({
  name: 'Land',
  description: 'An area of land for cultivation projects.',
  fields: () => ({
    id: globalIdField('Land'),
    name: {
      type: GraphQLString,
      description: 'A cultivation project\'s name.',
    },
    location: {
      type: GraphQLString,
      description: 'A cultivation project\'s location.',
    },
    description: {
      type: GraphQLString,
      description: 'A cultivation project\'s size and overview.',
    },
    size: {
      type: GraphQLString,
      description: 'A cultivation project\'s size.',
    },
    image: {
      type: GraphQLString,
      description: 'A cultivation project\'s image url.',
    },
    admins: {
      type: UserConnection,
      description: 'A cultivation project\'s list of decision makers.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const userPromises = _.admins.map(u => getItem(getEndpoint(UserType), u.id));
        const userResults = await* userPromises;
        return connectionFromArray(
          userResults,
          args
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
    projects: {
      type: ProjectConnection,
      description: 'An area of land\'s project list.',
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
  }),
  interfaces: [nodeInterface],
}));

export const {
  connectionType: LandConnection,
  edgeType: LandEdge,
} = connectionDefinitions({
  name: 'Land',
  nodeType: LandType,
});
