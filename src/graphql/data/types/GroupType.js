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

export const GroupType = registerType(new GraphQLObjectType({
  name: 'Group',
  description: 'A cultivation project.',
  fields: () => ({
    id: globalIdField('Group'),
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
    category: {
      type: GraphQLString,
      description: 'A cultivation project\'s category.',
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
      description: 'A cultivation project\'s list of economic inputs.',
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
      description: 'A cultivation project\'s list of pending economic inputs.',
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
  connectionType: GroupConnection,
  edgeType: GroupEdge,
} = connectionDefinitions({
  name: 'Group',
  nodeType: GroupType,
});
