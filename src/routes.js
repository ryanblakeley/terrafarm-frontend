import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CoreContainerTheme from './core/CoreContainer';
import Home from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import NotFound from './not-found/NotFoundPage';
import ProfileContainer from './profile/ProfileContainer';
import ProfileQueries from './profile/ProfileQueries';
import UserContainer from './user/UserContainer';
import UserQueries from './user/UserQueries';
import BrowseContainer from './browse/BrowseContainer';
import QueryQueries from './shared/QueryQueries';
import ResourceContainer from './resource/ResourceContainer';
import ResourceQueries from './resource/ResourceQueries';
import OrganizationContainer from './organization/OrganizationContainer';
import OrganizationQueries from './organization/OrganizationQueries';
import ProjectContainer from './project/ProjectContainer';
import ProjectQueries from './project/ProjectQueries';
import TaskContainer from './task/TaskContainer';
import TaskQueries from './task/TaskQueries';
import Loading from './core/components/Loading';

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
    <IndexRoute component={Home} />
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
    />
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
      />
    </Route>
    <Route path={'organization'} onEnter={ensurePublicAccess} >
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        renderLoading={renderLoading}
      />
    </Route>
    <Route path={'project'} onEnter={ensurePublicAccess} >
      <Route
        path={':projectId'}
        component={ProjectContainer}
        queries={ProjectQueries}
        renderLoading={renderLoading}
      />
    </Route>
    <Route path={'task'} onEnter={ensurePublicAccess} >
      <Route
        path={':taskId'}
        component={TaskContainer}
        queries={TaskQueries}
        renderLoading={renderLoading}
      />
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
