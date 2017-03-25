import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

// Components
import CoreContainerTheme from 'core/components/CorePage';
import Loading from 'core/components/Loading';
import HomePage from 'home/components/HomePage';
// import AboutPage from 'about/components/AboutPage';
import LoginPage from 'login/components/LoginPage';
import NotFound from 'not-found/components/NotFoundPage';
import BrowsePage from 'browse/components/BrowsePage';

// Containers
import ProfileContainer from 'profile/containers/ProfileContainer';
import EditProfileForm from 'profile/containers/EditProfileForm';
import UserContainer from 'user/containers/UserContainer';
import OrganizationContainer from 'organization/containers/OrganizationContainer';
import CreateOrganizationForm from 'organization/containers/CreateOrganizationForm';
import EditOrganizationForm from 'organization/containers/EditOrganizationForm';
import ProductContainer from 'product/containers/ProductContainer';
import CreateProductForm from 'product/containers/CreateProductForm';
import EditProductForm from 'product/containers/EditProductForm';
import ProductShareContainer from 'product-share/containers/ProductShareContainer';
import EditProductShareForm from 'product-share/containers/EditProductShareForm';
import ReserveShareForm from 'product-share/containers/ReserveShareForm';
import AssignShareForm from 'product-share/containers/AssignShareForm';
import ValidateShareForm from 'product-share/containers/ValidateShareForm';
import ProcessShareTokenContainer from 'product-share/containers/ProcessShareTokenContainer';
import CancelShareForm from 'product-share/containers/CancelShareForm';
import DistributionContainer from 'distribution/containers/DistributionContainer';
import CreateDistributionForm from 'distribution/containers/CreateDistributionForm';
import EditDistributionForm from 'distribution/containers/EditDistributionForm';
import LookupDistributionForm from 'distribution/containers/LookupDistributionForm';
import ProcessDistributionTokenContainer from 'distribution/containers/ProcessDistributionTokenContainer';
import ForwardDistributionTokenContainer from 'distribution/containers/ForwardDistributionTokenContainer';
import CancelDistributionForm from 'distribution/containers/CancelDistributionForm';
import SearchOrganizationsContainer from 'browse/containers/SearchOrganizationsContainer';
import PlaceLookupContainer from 'place/containers/PlaceLookupContainer';

// Queries
import ProfileQueries from 'profile/queries/ProfileQueries';
import ProfileQueryQueries from 'profile/queries/ProfileQueryQueries';
import UserQueries from 'user/queries/UserQueries';
import UserProductQueryQueries from 'user/queries/UserProductQueryQueries';
import OrganizationQueries from 'organization/queries/OrganizationQueries';
import OrganizationQueryQueries from 'organization/queries/OrganizationQueryQueries';
import EditOrganizationQueries from 'organization/queries/EditOrganizationQueries';
import ProductQueries from 'product/queries/ProductQueries';
import ProductQueryQueries from 'product/queries/ProductQueryQueries';
import EditProductQueries from 'product/queries/EditProductQueries';
import ProductShareQueries from 'product-share/queries/ProductShareQueries';
import ProductShareQueryQueries from 'product-share/queries/ProductShareQueryQueries';
import EditProductShareQueries from 'product-share/queries/EditProductShareQueries';
import ValidateShareQueries from 'product-share/queries/ValidateShareQueries';
import ProcessShareTokenQueries from 'product-share/queries/ProcessShareTokenQueries';
import CancelShareQueries from 'product-share/queries/CancelShareQueries';
import DistributionQueries from 'distribution/queries/DistributionQueries';
import EditDistributionQueries from 'distribution/queries/EditDistributionQueries';
import LookupDistributionQueries from 'distribution/queries/LookupDistributionQueries';
import ProcessDistributionTokenQueries from 'distribution/queries/ProcessDistributionTokenQueries';
import ForwardDistributionTokenQueries from 'distribution/queries/ForwardDistributionTokenQueries';
import CancelDistributionQueries from 'distribution/queries/CancelDistributionQueries';
import QueryQueries from 'browse/queries/QueryQueries';
import PlaceQueries from 'place/queries/PlaceQueries';

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

function bounceToProfile (nextState, replace) {
  const userId = localStorage.getItem('user_uuid');

  if (userId === nextState.params.userId) {
    replace('/profile');
  }
}

function bounceToAbout (nextState, replace) {
  window.location.replace('https://terra.farm/pages/about');
}

function ensurePublicAccess () {
  const userId = localStorage.getItem('user_uuid');
  const idToken = localStorage.getItem('id_token');
  const needsReset = !idToken || (!userId && idToken !== window.anonymousToken);

  if (needsReset) {
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

function renderCallback ({done, error, props, retry, stale}, container) {
  if (error) {
    console.error(`Relay renderer ${error}`);
    return <NotFound />;
  } else if (props) {
    return React.cloneElement(container, {...props});
  } else { // eslint-disable-line
    return <Loading />;
  }
}

renderCallback.propTypes = {
  done: React.PropTypes.bool,
  error: React.PropTypes.object,
  props: React.PropTypes.object,
  retry: React.PropTypes.func,
  stale: React.PropTypes.bool,
};

const routes = (
  <Route path={'/'} component={CoreContainerTheme}>
    <IndexRoute component={HomePage} />
    <Route path={'about'} onEnter={bounceToAbout} />
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
      render={renderArgs => renderCallback(renderArgs, <ProfileContainer />)}
    >
      <Route path={'edit'} component={EditProfileForm} queries={ProfileQueries} >
        <Route path={'place-lookup'}>
          <Route
            path={':placeId'}
            component={PlaceLookupContainer}
            queries={PlaceQueries}
          />
        </Route>
      </Route>
      <Route path={'create-farm'} component={CreateOrganizationForm} queries={ProfileQueryQueries} >
        <Route path={'place-lookup'}>
          <Route
            path={':placeId'}
            component={PlaceLookupContainer}
            queries={PlaceQueries}
          />
        </Route>
      </Route>
    </Route>
    <Route
      path={'browse'}
      component={BrowsePage}
      onEnter={ensurePublicAccess}
    >
      <IndexRedirect to={'farms'} />
      <Route
        path={'farms'}
        component={SearchOrganizationsContainer}
        queries={QueryQueries}
        render={renderArgs => renderCallback(renderArgs, <SearchOrganizationsContainer />)}
      />
    </Route>
    <Route path={'user'} onEnter={ensurePublicAccess} >
      <IndexRoute component={NotFound} />
      <Route
        path={':userId'}
        component={UserContainer}
        queries={UserQueries}
        onEnter={bounceToProfile}
        render={renderArgs => renderCallback(renderArgs, <UserContainer />)}
      />
    </Route>
    <Route path={'farm'} onEnter={ensurePublicAccess} prepareParams={prepareProfileParams} >
      <IndexRoute component={NotFound} />
      <Route
        path={':organizationId'}
        component={OrganizationContainer}
        queries={OrganizationQueries}
        render={renderArgs => renderCallback(renderArgs, <OrganizationContainer />)}
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
            />
          </Route>
        </Route>
        <Route
          path={'accept-voucher'}
          component={LookupDistributionForm}
          queries={LookupDistributionQueries}
          onEnter={loginBouncer}
        >
          <Route
            path={':distributionToken'}
            component={ForwardDistributionTokenContainer}
            queries={ForwardDistributionTokenQueries}
          />
        </Route>
      </Route>
    </Route>
    <Route path={'product'} onEnter={ensurePublicAccess} prepareParams={prepareProfileParams} >
      <IndexRoute component={NotFound} />
      <Route
        path={':productId'}
        component={ProductContainer}
        queries={ProductQueries}
        render={renderArgs => renderCallback(renderArgs, <ProductContainer />)}
      >
        <Route
          path={'edit'}
          component={EditProductForm}
          queries={EditProductQueries}
          onEnter={loginBouncer}
        />
        <Route
          path={'reserve-share'}
          component={ReserveShareForm}
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
      <IndexRoute component={NotFound} />
      <Route
        path={':shareId'}
        component={ProductShareContainer}
        queries={ProductShareQueries}
        render={renderArgs => renderCallback(renderArgs, <ProductShareContainer />)}
      >
        <Route
          path={'edit'}
          component={EditProductShareForm}
          queries={EditProductShareQueries}
        />
        <Route
          path={'create-voucher'}
          component={CreateDistributionForm}
          queries={ProductShareQueryQueries}
        />
        <Route
          path={'activate'}
          component={ValidateShareForm}
          queries={ValidateShareQueries}
        >
          <Route
            path={':shareToken'}
            component={ProcessShareTokenContainer}
            queries={ProcessShareTokenQueries}
          />
        </Route>
        <Route
          path={'cancel'}
          component={CancelShareForm}
          queries={CancelShareQueries}
        />
      </Route>
    </Route>
    <Route path={'voucher'} onEnter={loginBouncer} >
      <IndexRoute component={NotFound} />
      <Route
        path={':distributionId'}
        component={DistributionContainer}
        queries={DistributionQueries}
        render={renderArgs => renderCallback(renderArgs, <DistributionContainer />)}
      >
        <Route
          path={'edit'}
          component={EditDistributionForm}
          queries={EditDistributionQueries}
        />
        <Route path={'validate'}>
          <Route
            path={':distributionToken'}
            component={ProcessDistributionTokenContainer}
            queries={ProcessDistributionTokenQueries}
          />
        </Route>
        <Route
          path={'cancel'}
          component={CancelDistributionForm}
          queries={CancelDistributionQueries}
        />
      </Route>
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
