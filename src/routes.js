import React from 'react';
import {Route, IndexRoute} from 'react-router';

import CoreContainerTheme from './core/CoreContainer';
import Loading from './core/components/Loading';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import NotFound from './not-found/NotFoundPage';

import BrowseContainer from './browse/BrowseContainer';
import QueryQueries from './shared/QueryQueries';

import ProfileContainer from './profile/ProfileContainer';
import JoinOrganizationContainer from './profile/JoinOrganizationContainer';
import CreateResourceForm from './profile/components/CreateResourceForm';
import CreateOrganizationForm from './profile/components/CreateOrganizationForm';
import EditProfileForm from './profile/components/EditProfileForm';
import ProfileQueries from './profile/ProfileQueries';
import ProfileQueryQueries from './profile/ProfileQueryQueries';
import JoinOrganizationQueries from './profile/JoinOrganizationQueries';

import UserContainer from './user/UserContainer';
import UserQueries from './user/UserQueries';

import ResourceContainer from './resource/ResourceContainer';
import EditResourceForm from './resource/components/EditResourceForm';
import RequestResourceForm from './resource/components/RequestResourceForm';
import ResourceQueries from './resource/ResourceQueries';
import ResourceCurrentPersonQueries from './resource/ResourceCurrentPersonQueries';

import OrganizationContainer from './organization/OrganizationContainer';
import RequestResourceForOrganizationForm
  from './organization/components/RequestResourceForOrganizationForm';
import OfferResourceToOrganizationForm
  from './organization/components/OfferResourceToOrganizationForm';
import EditOrganizationForm from './organization/components/EditOrganizationForm';
import CreateProjectForm from './organization/components/CreateProjectForm';
import EditOrganizationResourceForm from './organization/components/EditOrganizationResourceForm';
import OrganizationQueries from './organization/OrganizationQueries';
import OrganizationCurrentPersonQueries from './organization/OrganizationCurrentPersonQueries';
import OrganizationResourceQueries from './organization/OrganizationResourceQueries';

import ProjectContainer from './project/ProjectContainer';
import RequestResourceForProjectForm
  from './project/components/RequestResourceForProjectForm';
import OfferResourceToProjectForm
  from './project/components/OfferResourceToProjectForm';
import EditProjectForm from './project/components/EditProjectForm';
import CreateTaskForm from './project/components/CreateTaskForm';
import EditProjectResourceForm from './project/components/EditProjectResourceForm';
import ProjectQueries from './project/ProjectQueries';
import ProjectCurrentPersonQueries from './project/ProjectCurrentPersonQueries';
import ProjectResourceQueries from './project/ProjectResourceQueries';

import TaskContainer from './task/TaskContainer';
import RequestResourceForTaskForm
  from './task/components/RequestResourceForTaskForm';
import OfferResourceToTaskForm
  from './task/components/OfferResourceToTaskForm';
import EditTaskForm from './task/components/EditTaskForm';
import EditTaskResourceForm from './task/components/EditTaskResourceForm';
import TaskQueries from './task/TaskQueries';
import TaskCurrentPersonQueries from './task/TaskCurrentPersonQueries';
import TaskResourceQueries from './task/TaskResourceQueries';

function prepareProfileParams (params, {location}) {
  return {
    ...params,
    userId: localStorage.getItem('user_uuid'),
  };
}

function enterLogin (nextState, replace) {
  const userId = localStorage.getItem('user_uuid');
  const idToken = localStorage.getItem('id_token');

  if (userId
      && idToken
      && idToken !== window.anonymousToken
      && idToken !== window.registrarToken) {
    replace('/profile');
  } else {
    setRegistrarToken();
  }
}

function loginBouncer (nextState, replace) {
  const userId = localStorage.getItem('user_uuid');
  const idToken = localStorage.getItem('id_token');

  if (!userId
      || !idToken
      || idToken === window.anonymousToken
      || idToken === window.registrarToken) {
    replace('/login');
  }
}

function ensurePublicAccess (nextState, replace) {
  const idToken = localStorage.getItem('id_token');
  if (!idToken
      || idToken === window.registrarToken) {
    setAnonymousToken();
  }
}

function setAnonymousToken () {
  localStorage.setItem('id_token', window.anonymousToken);
}

function setRegistrarToken () {
  localStorage.setItem('id_token', window.registrarToken);
  localStorage.setItem('user_uuid', '');
}

function renderLoading () {
  return <Loading />;
}

const routes = (
  <Route path={'/'} component={CoreContainerTheme} >
    <IndexRoute component={HomePage} />
    <Route path={'about'} component={AboutPage} />
    <Route
      path={'login'}
      component={LoginPage}
      onEnter={enterLogin}
    />
    <Route
      path={'profile'}
      component={ProfileContainer}
      queries={ProfileQueries}
      prepareParams={prepareProfileParams}
      onEnter={loginBouncer}
      renderLoading={renderLoading}
    >
      <Route path={'join-organization'}>
        <Route
          path={':organizationId'}
          component={JoinOrganizationContainer}
          queries={JoinOrganizationQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'edit'} component={EditProfileForm} queries={UserQueries} />
      <Route path={'new-resource'} component={CreateResourceForm} queries={ProfileQueryQueries} />
      <Route path={'new-organization'} component={CreateOrganizationForm} queries={ProfileQueryQueries} />
    </Route>
    <Route
      path={'browse'}
      component={BrowseContainer}
      queries={QueryQueries}
      onEnter={ensurePublicAccess}
      renderLoading={renderLoading}
    />
    <Route path={'user'} onEnter={ensurePublicAccess} >
      <Route
        path={':userId'}
        component={UserContainer}
        queries={UserQueries}
        renderLoading={renderLoading}
      />
    </Route>
    <Route path={'resource'} onEnter={ensurePublicAccess} >
      <Route
        path={':resourceId'}
        component={ResourceContainer}
        queries={ResourceQueries}
        renderLoading={renderLoading}
      >
        <Route path={'request-resource'} component={RequestResourceForm} queries={ResourceCurrentPersonQueries} />
        <Route path={'edit'} component={EditResourceForm} queries={ResourceQueries} />
      </Route>
    </Route>
    <Route path={'organization'} onEnter={ensurePublicAccess} >
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        renderLoading={renderLoading}
      >
        <Route path={'request-resource'} component={RequestResourceForOrganizationForm} queries={OrganizationQueries} />
        <Route path={'offer-resource'} component={OfferResourceToOrganizationForm} queries={OrganizationCurrentPersonQueries} />
        <Route path={'edit'} component={EditOrganizationForm} queries={OrganizationQueries} />
        <Route path={'new-project'} component={CreateProjectForm} queries={OrganizationQueries} />
        <Route path={'review-allocation'}>
          <Route
            path={':organizationResourceId'}
            component={EditOrganizationResourceForm}
            queries={OrganizationResourceQueries}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'project'} onEnter={ensurePublicAccess} >
      <Route
        path={':projectId'}
        component={ProjectContainer}
        queries={ProjectQueries}
        renderLoading={renderLoading}
      >
        <Route path={'request-resource'} component={RequestResourceForProjectForm} queries={ProjectQueries} />
        <Route path={'offer-resource'} component={OfferResourceToProjectForm} queries={ProjectCurrentPersonQueries} />
        <Route path={'edit'} component={EditProjectForm} queries={ProjectQueries} />
        <Route path={'new-task'} component={CreateTaskForm} queries={ProjectQueries} />
        <Route path={'review-allocation'}>
          <Route
            path={':projectResourceId'}
            component={EditProjectResourceForm}
            queries={ProjectResourceQueries}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'task'} onEnter={ensurePublicAccess} >
      <Route
        path={':taskId'}
        component={TaskContainer}
        queries={TaskQueries}
        renderLoading={renderLoading}
      >
        <Route path={'request-resource'} component={RequestResourceForTaskForm} queries={TaskQueries} />
        <Route path={'offer-resource'} component={OfferResourceToTaskForm} queries={TaskCurrentPersonQueries} />
        <Route path={'edit'} component={EditTaskForm} queries={TaskQueries} />
        <Route path={'review-allocation'}>
          <Route
            path={':taskResourceId'}
            component={EditTaskResourceForm}
            queries={TaskResourceQueries}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
