import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import CoreContainerTheme from './core/CoreContainer';
import Loading from './core/components/Loading';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import LoginPage from './login/LoginPage';
import NotFound from './not-found/NotFoundPage';

import BrowseContainer from './browse/BrowseContainer';
import PerformSearchOrganizations from './browse/components/PerformSearchOrganizations';
import PerformSearchUsers from './browse/components/PerformSearchUsers';
import QueryQueries from './shared/QueryQueries';

import ProfileContainer from './profile/ProfileContainer';
import JoinOrganizationContainer from './profile/JoinOrganizationContainer';
import CreateOrganizationForm from './profile/components/CreateOrganizationForm';
import EditProfileForm from './profile/components/EditProfileForm';
import ProfileQueryQueries from './profile/ProfileQueryQueries';
import JoinOrganizationQueries from './profile/JoinOrganizationQueries';

import UserContainer from './user/UserContainer';
import StarUserForm from './user/components/StarUserForm';
import UserQueries from './user/UserQueries';
import UserCurrentPersonQueries from './user/UserCurrentPersonQueries';

import OrganizationContainer from './organization/OrganizationContainer';
import OfferMemberForm from './organization/components/OfferMemberForm';
import EditMemberForm from './organization/components/EditMemberForm';
import EditOrganizationForm from './organization/components/EditOrganizationForm';
import OrganizationQueries from './organization/OrganizationQueries';
import EditOrganizationQueries from './organization/EditOrganizationQueries';
import OrganizationCurrentPersonQueries from './organization/OrganizationCurrentPersonQueries';
import MemberQueries from './organization/MemberQueries';

import PlaceRegistryContainer from './place/PlaceRegistryContainer';
import PlaceQueries from './place/PlaceQueries';

function prepareProfileParams (params, {location}) {
  return {
    ...params,
    userId: localStorage.getItem('user_uuid') || '',
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
      renderLoading={renderLoading}
    >
      <IndexRedirect to={'organizations'} />
      <Route
        path={'organizations'}
        component={PerformSearchOrganizations}
        queries={QueryQueries}
        onEnter={ensurePublicAccess}
        renderLoading={renderLoading}
      />
      <Route
        path={'users'}
        component={PerformSearchUsers}
        queries={QueryQueries}
        onEnter={ensurePublicAccess}
        renderLoading={renderLoading}
      />
    </Route>
    <Route path={'user'} onEnter={ensurePublicAccess} >
      <Route
        path={':userId'}
        component={UserContainer}
        queries={UserQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'star'}
          component={StarUserForm}
          queries={UserCurrentPersonQueries}
          onEnter={loginBouncer}
        />
      </Route>
    </Route>
    <Route path={'organization'} onEnter={ensurePublicAccess} prepareParams={prepareProfileParams} >
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'new-member'}
          component={OfferMemberForm}
          queries={OrganizationCurrentPersonQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'edit'}
          component={EditOrganizationForm}
          queries={EditOrganizationQueries}
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
        <Route path={'review-membership'}>
          <Route
            path={':organizationMemberId'}
            component={EditMemberForm}
            queries={MemberQueries}
            onEnter={loginBouncer}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
