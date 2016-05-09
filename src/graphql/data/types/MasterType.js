import {
  GraphQLObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import {registerType, getEndpoint} from './registry';
import {nodeInterface} from './node';

import getItem from '../api/getItem';

import {UserType, UserConnection} from './UserType';
import {ResourceType, ResourceConnection} from './ResourceType';
import {LandType, LandConnection} from './LandType';
import {ProjectType, ProjectConnection} from './ProjectType';
import {TaskType, TaskConnection} from './TaskType';

// const userEndpoint = getEndpoint(UserType);
// const resourceEndpoint = getEndpoint(ResourceType);
// const landEndpoint = getEndpoint(LandType);

export default registerType(new GraphQLObjectType({
  name: 'Master',
  description: 'A root-level client wrapper.',
  fields: {
    id: globalIdField('Master'),
    users: {
      type: UserConnection,
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
    lands: {
      type: LandConnection,
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
    projects: {
      type: ProjectConnection,
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
    tasks: {
      type: TaskConnection,
      args: connectionArgs,
      resolve: async (_, args) => {
        const taskPromises = _.tasks.map(p => getItem(getEndpoint(TaskType), p.id));
        const taskResults = await* taskPromises;
        return connectionFromArray(
          taskResults,
          args
        );
      },
    },
  },
  interfaces: [nodeInterface],
}));
