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
import {GroupType, GroupConnection} from './GroupType';

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
    groupsAdmin: {
      type: GroupConnection,
      description: 'A list of groups in which a person is a decision maker.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups_admin.map(g => getItem(getEndpoint(GroupType), g.id));
        const groupResults = await* groupPromises;
        return connectionFromArray(
          groupResults,
          args
        );
      },
    },
    groupsLiked: {
      type: GroupConnection,
      description: 'A list of groups that a person has liked.',
      args: connectionArgs,
      resolve: async (_, args) => {
        const groupPromises = _.groups_liked.map(g => getItem(getEndpoint(GroupType), g.id));
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
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
