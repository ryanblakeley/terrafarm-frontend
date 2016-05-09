import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {fromGlobalId} from 'graphql-relay';

import {getEndpoint} from './types/registry';

import getItem from './api/getItem';
import sheetQuery from './api/sheetQuery';

import {LandType} from './types/LandType';
import MasterType from './types/MasterType';
import {UserType} from './types/UserType';
import {ResourceType} from './types/ResourceType';
import {ProjectType} from './types/ProjectType';
import {TaskType} from './types/TaskType';
import {nodeField} from './types/node';

import AddResourceToLandMutation from './mutations/AddResourceToLandMutation';
import AddResourceToProjectMutation from './mutations/AddResourceToProjectMutation';
import AddResourceToTaskMutation from './mutations/AddResourceToTaskMutation';
import DeleteLandMutation from './mutations/DeleteLandMutation';
import DeleteProjectMutation from './mutations/DeleteProjectMutation';
import DeleteResourceMutation from './mutations/DeleteResourceMutation';
import DeleteTaskMutation from './mutations/DeleteTaskMutation';
import DeleteUserMutation from './mutations/DeleteUserMutation';
import LikeLandMutation from './mutations/LikeLandMutation';
import LikeProjectMutation from './mutations/LikeProjectMutation';
import LikeResourceMutation from './mutations/LikeResourceMutation';
import NewLandMutation from './mutations/NewLandMutation';
import NewProjectMutation from './mutations/NewProjectMutation';
import NewTaskMutation from './mutations/NewTaskMutation';
import NewResourceMutation from './mutations/NewResourceMutation';
import NewUserMutation from './mutations/NewUserMutation';
import PendingResourceToLandMutation from './mutations/PendingResourceToLandMutation';
import PendingResourceToProjectMutation from './mutations/PendingResourceToProjectMutation';
import PendingResourceToTaskMutation from './mutations/PendingResourceToTaskMutation';
import RemovePendingResourceToLandMutation from './mutations/RemovePendingResourceToLandMutation';
import RemovePendingResourceToProjectMutation from './mutations/RemovePendingResourceToProjectMutation';
import RemovePendingResourceToTaskMutation from './mutations/RemovePendingResourceToTaskMutation';
import RemoveResourceFromLandMutation from './mutations/RemoveResourceFromLandMutation';
import RemoveResourceFromProjectMutation from './mutations/RemoveResourceFromProjectMutation';
import RemoveResourceFromTaskMutation from './mutations/RemoveResourceFromTaskMutation';
import UnlikeLandMutation from './mutations/UnlikeLandMutation';
import UnlikeProjectMutation from './mutations/UnlikeProjectMutation';
import UnlikeResourceMutation from './mutations/UnlikeResourceMutation';
import UpdateLandMutation from './mutations/UpdateLandMutation';
import UpdateProjectMutation from './mutations/UpdateProjectMutation';
import UpdateResourceMutation from './mutations/UpdateResourceMutation';
import UpdateTaskMutation from './mutations/UpdateTaskMutation';
import UpdateUserMutation from './mutations/UpdateUserMutation';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    land: {
      type: LandType,
      args: {
        landId: { type: GraphQLString },
      },
      resolve: async (_, {landId}) => {
        const id = fromGlobalId(landId).id;
        return await getItem(getEndpoint(LandType), id);
      },
    },
    master: {
      type: MasterType,
      resolve: async () => await getItem(getEndpoint(MasterType), 1),
    },
    resource: {
      type: ResourceType,
      args: {
        resourceId: { type: GraphQLString },
      },
      resolve: async (_, {resourceId}) => {
        const id = fromGlobalId(resourceId).id;
        return await getItem(getEndpoint(ResourceType), id);
      },
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve: async (_, {userId}) => {
        const id = fromGlobalId(userId).id;
        return await getItem(getEndpoint(UserType), id);
      },
    },
    viewer: {
      type: UserType,
      resolve: async (_, args, {rootValue: {user}}) => {
        const query = '?email=' + user.email;
        const result = await sheetQuery(getEndpoint(UserType), query);
        return result[0];
      },
    },
    project: {
      type: ProjectType,
      args: {
        projectId: { type: GraphQLString },
      },
      resolve: async (_, {projectId}) => {
        const id = fromGlobalId(projectId).id;
        return await getItem(getEndpoint(ProjectType), id);
      },
    },
    task: {
      type: TaskType,
      args: {
        taskId: { type: GraphQLString },
      },
      resolve: async (_, {taskId}) => {
        const id = fromGlobalId(taskId).id;
        return await getItem(getEndpoint(TaskType), id);
      },
    },
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addResourceToLand: AddResourceToLandMutation,
    addResourceToProject: AddResourceToProjectMutation,
    addResourceToTask: AddResourceToTaskMutation,
    deleteLand: DeleteLandMutation,
    deleteProject: DeleteProjectMutation,
    deleteResource: DeleteResourceMutation,
    deleteTask: DeleteTaskMutation,
    deleteUser: DeleteUserMutation,
    likeLand: LikeLandMutation,
    likeProject: LikeProjectMutation,
    likeResource: LikeResourceMutation,
    newLand: NewLandMutation,
    newProject: NewProjectMutation,
    //newTask: NewTaskMutation,
    newResource: NewResourceMutation,
    newUser: NewUserMutation,
    pendingResourceToLand: PendingResourceToLandMutation,
    pendingResourceToProject: PendingResourceToProjectMutation,
    pendingResourceToTask: PendingResourceToTaskMutation,
    removePendingResourceToLand: RemovePendingResourceToLandMutation,
    removePendingResourceToProject: RemovePendingResourceToProjectMutation,
    removePendingResourceToTask: RemovePendingResourceToTaskMutation,
    removeResourceFromLand: RemoveResourceFromLandMutation,
    removeResourceFromProject: RemoveResourceFromProjectMutation,
    removeResourceFromTask: RemoveResourceFromTaskMutation,
    unlikeLand: UnlikeLandMutation,
    unlikeProject: UnlikeProjectMutation,
    unlikeResource: UnlikeResourceMutation,
    updateLand: UpdateLandMutation,
    updateProject: UpdateProjectMutation,
    updateResource: UpdateResourceMutation,
    updateTask: UpdateTaskMutation,
    updateUser: UpdateUserMutation,
  }),
});

export const Schema = new GraphQLSchema({
  mutation: Mutation,
  query: Root,
});
