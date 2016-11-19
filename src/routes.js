import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import CoreContainerTheme from './core/CoreContainer';
import Loading from './core/components/Loading';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import NotFound from './not-found/NotFoundPage';

import BrowseContainer from './browse/BrowseContainer';
import PerformSearchResources from './browse/components/PerformSearchResources';
import PerformSearchTasks from './browse/components/PerformSearchTasks';
import PerformSearchOrganizations from './browse/components/PerformSearchOrganizations';
import PerformSearchUsers from './browse/components/PerformSearchUsers';
import QueryQueries from './shared/QueryQueries';

import ProfileContainer from './profile/ProfileContainer';
import JoinOrganizationContainer from './profile/JoinOrganizationContainer';
import CreateResourceForm from './profile/components/CreateResourceForm';
import CreateTaskForm from './profile/components/CreateTaskForm';
import CreateOrganizationForm from './profile/components/CreateOrganizationForm';
import EditProfileForm from './profile/components/EditProfileForm';
import ProfileQueryQueries from './profile/ProfileQueryQueries';
import JoinOrganizationQueries from './profile/JoinOrganizationQueries';

import UserContainer from './user/UserContainer';
import UserQueries from './user/UserQueries';

import ResourceContainer from './resource/ResourceContainer';
import EditResourceForm from './resource/components/EditResourceForm';
import RequestResourceForm from './resource/components/RequestResourceForm';
import StarResourceForm from './resource/components/StarResourceForm';
import ResourceQueries from './resource/ResourceQueries';
import ResourceQueryQueries from './resource/ResourceQueryQueries';
import ResourceCurrentPersonQueries from './resource/ResourceCurrentPersonQueries';

import OrganizationContainer from './organization/OrganizationContainer';
import RequestResourceForOrganizationForm
  from './organization/components/RequestResourceForOrganizationForm';
import OfferResourceToOrganizationForm
  from './organization/components/OfferResourceToOrganizationForm';
import EditOrganizationForm from './organization/components/EditOrganizationForm';
import EditOrganizationResourceForm from './organization/components/EditOrganizationResourceForm';
import OrganizationQueries from './organization/OrganizationQueries';
import OrganizationQueryQueries from './organization/OrganizationQueryQueries';
import OrganizationResourceQueries from './organization/OrganizationResourceQueries';
import OrganizationCurrentPersonQueries from './organization/OrganizationCurrentPersonQueries';

import TaskContainer from './task/TaskContainer';
import RequestResourceForTaskForm
  from './task/components/RequestResourceForTaskForm';
import OfferResourceToTaskForm
  from './task/components/OfferResourceToTaskForm';
import EditTaskForm from './task/components/EditTaskForm';
import EditTaskResourceForm from './task/components/EditTaskResourceForm';
import TaskQueries from './task/TaskQueries';
import TaskQueryQueries from './task/TaskQueryQueries';
import TaskResourceQueries from './task/TaskResourceQueries';
import TaskCurrentPersonQueries from './task/TaskCurrentPersonQueries';

import PlaceRegistryContainer from './place/PlaceRegistryContainer';
import PlaceQueries from './place/PlaceQueries';

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
      queries={UserQueries}
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
      <Route path={'edit'} component={EditProfileForm} queries={UserQueries} >
        <Route path={'place-registry'}>
          <Route
            path={':placeId'}
            component={PlaceRegistryContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
      <Route path={'new-resource'} component={CreateResourceForm} queries={ProfileQueryQueries} >
        <Route path={'place-registry'}>
          <Route
            path={':placeId'}
            component={PlaceRegistryContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
      <Route path={'new-task'} component={CreateTaskForm} queries={ProfileQueryQueries} >
        <Route path={'place-registry'}>
          <Route
            path={':placeId'}
            component={PlaceRegistryContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
      <Route path={'new-organization'} component={CreateOrganizationForm} queries={ProfileQueryQueries} >
        <Route path={'place-registry'}>
          <Route
            path={':placeId'}
            component={PlaceRegistryContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
    </Route>
    <Route
      path={'browse'}
      component={BrowseContainer}
      queries={QueryQueries}
      onEnter={ensurePublicAccess}
      renderLoading={renderLoading}
    >
      <IndexRedirect to={'resources'} />
      <Route
        path={'resources'}
        component={PerformSearchResources}
        queries={QueryQueries}
        renderLoading={renderLoading}
      />
      <Route
        path={'organizations'}
        component={PerformSearchOrganizations}
        queries={QueryQueries}
        renderLoading={renderLoading}
      />
      <Route
        path={'tasks'}
        component={PerformSearchTasks}
        queries={QueryQueries}
        renderLoading={renderLoading}
      />
      <Route
        path={'users'}
        component={PerformSearchUsers}
        queries={QueryQueries}
        renderLoading={renderLoading}
      />
    </Route>
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
        <Route path={'edit'} component={EditResourceForm} queries={ResourceQueryQueries} >
          <Route path={'place-registry'}>
            <Route
              path={':placeId'}
              component={PlaceRegistryContainer}
              queries={PlaceQueries}
              renderLoading={renderLoading}
            />
          </Route>
        </Route>
        <Route path={'request-resource'} component={RequestResourceForm} queries={ResourceCurrentPersonQueries} />
        <Route path={'star'} component={StarResourceForm} queries={ResourceCurrentPersonQueries} />
      </Route>
    </Route>
    <Route path={'organization'} onEnter={ensurePublicAccess} >
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'request-resource'}
          component={RequestResourceForOrganizationForm}
          queries={OrganizationCurrentPersonQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'offer-resource'}
          component={OfferResourceToOrganizationForm}
          queries={OrganizationCurrentPersonQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'edit'}
          component={EditOrganizationForm}
          queries={OrganizationQueryQueries}
          onEnter={loginBouncer}
        >
          <Route path={'place-registry'}>
            <Route
              path={':placeId'}
              component={PlaceRegistryContainer}
              queries={PlaceQueries}
              renderLoading={renderLoading}
            />
          </Route>
        </Route>
        <Route path={'review-allocation'}>
          <Route
            path={':organizationResourceId'}
            component={EditOrganizationResourceForm}
            queries={OrganizationResourceQueries}
            onEnter={loginBouncer}
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
        <Route
          path={'request-resource'}
          component={RequestResourceForTaskForm}
          queries={TaskCurrentPersonQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'offer-resource'}
          component={OfferResourceToTaskForm}
          queries={TaskCurrentPersonQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'edit'}
          component={EditTaskForm}
          queries={TaskQueryQueries}
          onEnter={loginBouncer}
        >
          <Route path={'place-registry'}>
            <Route
              path={':placeId'}
              component={PlaceRegistryContainer}
              queries={PlaceQueries}
              renderLoading={renderLoading}
            />
          </Route>
        </Route>
        <Route path={'review-allocation'}>
          <Route
            path={':taskResourceId'}
            component={EditTaskResourceForm}
            queries={TaskResourceQueries}
            onEnter={loginBouncer}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
