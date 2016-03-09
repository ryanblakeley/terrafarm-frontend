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
import {GroupType, GroupConnection} from './GroupType';

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
    groups: {
      type: GroupConnection,
      description: 'An economic input\'s list of groups with access.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups.map(g => getItem(getEndpoint(GroupType), g.id));
        const groupResults = await* groupPromises;
        return connectionFromArray(
          groupResults,
          args
        );
      },
    },
    groupsPending: {
      type: GroupConnection,
      description: 'An economic input\'s list of pending group commitments.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups_pending.map(u => getItem(getEndpoint(GroupType), u.id));
        const groupResults = await* groupPromises;
        return connectionFromArray(
          groupResults,
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

