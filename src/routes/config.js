import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

// Static pages
import CoreContainerTheme from 'core/components/CorePage';
import Loading from 'core/components/Loading';
import HomePage from 'home/components/HomePage';
import AboutPage from 'about/components/AboutPage';
import LoginPage from 'login/components/LoginPage';
import NotFound from 'not-found/components/NotFoundPage';
import BrowsePage from 'browse/components/BrowsePage';

// Containers
import ProfileContainer from 'profile/containers/ProfileContainer';
import UserContainer from 'user/containers/UserContainer';
import OrganizationContainer from 'organization/containers/OrganizationContainer';
import ProductContainer from 'product/containers/ProductContainer';
import ProductShareContainer from 'product-share/containers/ProductShareContainer';
import DistributionContainer from 'distribution/containers/DistributionContainer';

import CreateOrganizationForm from 'profile/containers/CreateOrganizationForm';
import CreateProductForm from 'organization/containers/CreateProductForm';
import OrderShareForm from 'product/containers/OrderShareForm';
import AssignShareForm from 'product/containers/AssignShareForm';
import CreateDistributionForm from 'product-share/containers/CreateDistributionForm';

import EditProfileForm from 'profile/containers/EditProfileForm';
import EditOrganizationForm from 'organization/containers/EditOrganizationForm';
import EditProductForm from 'product/containers/EditProductForm';
import EditProductShareForm from 'product-share/containers/EditProductShareForm';
import EditDistributionForm from 'distribution/containers/EditDistributionForm';

import SearchOrganizationsContainer from 'browse/containers/SearchOrganizationsContainer';
import SearchUsersContainer from 'browse/containers/SearchUsersContainer';
import SearchProductsContainer from 'browse/containers/SearchProductsContainer';
import PlaceLookupContainer from 'place/containers/PlaceLookupContainer';
import StarUserForm from 'user/containers/StarUserForm';

// Queries
import QueryQueries from './QueryQueries';
import ProfileQueryQueries from './ProfileQueryQueries';
import UserQueries from './UserQueries';
import UserCurrentPersonQueries from './UserCurrentPersonQueries';
import UserProductQueryQueries from './UserProductQueryQueries';
import OrganizationQueries from './OrganizationQueries';
import OrganizationQueryQueries from './OrganizationQueryQueries';
import ProductQueries from './ProductQueries';
import ProductQueryQueries from './ProductQueryQueries';
import ProductShareQueries from './ProductShareQueries';
import ProductShareQueryQueries from './ProductShareQueryQueries';
import DistributionQueries from './DistributionQueries';
import EditOrganizationQueries from './EditOrganizationQueries';
import EditProductQueries from './EditProductQueries';
import EditProductShareQueries from './EditProductShareQueries';
import EditDistributionQueries from './EditDistributionQueries';
import PlaceQueries from './PlaceQueries';

function prepareProfileParams (params) {
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

function ensurePublicAccess () {
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
      <Route path={'edit'} component={EditProfileForm} queries={UserQueries} >
        <Route path={'place-lookup'}>
          <Route
            path={':placeId'}
            component={PlaceLookupContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
      <Route path={'create-farm'} component={CreateOrganizationForm} queries={ProfileQueryQueries} >
        <Route path={'place-lookup'}>
          <Route
            path={':placeId'}
            component={PlaceLookupContainer}
            queries={PlaceQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
    </Route>
    <Route
      path={'browse'}
      component={BrowsePage}
      renderLoading={renderLoading}
    >
      <IndexRedirect to={'farms'} />
      <Route
        path={'farms'}
        component={SearchOrganizationsContainer}
        queries={QueryQueries}
        onEnter={ensurePublicAccess}
        renderLoading={renderLoading}
      />
      <Route
        path={'products'}
        component={SearchProductsContainer}
        queries={QueryQueries}
        onEnter={ensurePublicAccess}
        renderLoading={renderLoading}
      />
      <Route
        path={'users'}
        component={SearchUsersContainer}
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
    <Route path={'farm'} onEnter={ensurePublicAccess} prepareParams={prepareProfileParams} >
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        renderLoading={renderLoading}
      >
        <Route path={'create-product'} component={CreateProductForm} queries={OrganizationQueryQueries} />
        <Route
          path={'edit'}
          component={EditOrganizationForm}
          queries={EditOrganizationQueries}
          onEnter={loginBouncer}
        >
          <Route path={'place-lookup'}>
            <Route
              path={':placeId'}
              component={PlaceLookupContainer}
              queries={PlaceQueries}
              renderLoading={renderLoading}
            />
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path={'product'} onEnter={ensurePublicAccess} prepareParams={prepareProfileParams} >
      <Route
        path={':productId'}
        component={ProductContainer}
        queries={ProductQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'edit'}
          component={EditProductForm}
          queries={EditProductQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'order-share'}
          component={OrderShareForm}
          queries={UserProductQueryQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'assign-share'}
          component={AssignShareForm}
          queries={ProductQueryQueries}
          onEnter={loginBouncer}
        />
      </Route>
    </Route>
    <Route path={'share'} onEnter={loginBouncer} >
      <Route
        path={':shareId'}
        component={ProductShareContainer}
        queries={ProductShareQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'edit'}
          component={EditProductShareForm}
          queries={EditProductShareQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'create-voucher'}
          component={CreateDistributionForm}
          queries={ProductShareQueryQueries}
          onEnter={loginBouncer}
        />
      </Route>
    </Route>
    <Route path={'voucher'} onEnter={loginBouncer} >
      <Route
        path={':distributionId'}
        component={DistributionContainer}
        queries={DistributionQueries}
        renderLoading={renderLoading}
      >
        <Route
          path={'edit'}
          component={EditDistributionForm}
          queries={EditDistributionQueries}
          onEnter={loginBouncer}
        />
      </Route>
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
