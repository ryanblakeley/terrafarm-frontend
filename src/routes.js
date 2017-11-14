/* eslint-disable react/prop-types */
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
// import RedirectException from 'found/lib/RedirectException';
import React from 'react';
import moment from 'moment';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';
import LoadingComponent from 'core/components/LoadingComponent';

// user
import ProfileContainer from 'profile/containers/ProfileContainer';
import ProfileContainerQuery from 'profile/queries/ProfileContainerQuery';
import LoginPage from 'login/components/LoginPage';
import LoginPageQuery from 'login/queries/LoginPageQuery';

// journal
import JournalContainer from 'journal/containers/JournalContainer';
import JournalContainerQuery from 'journal/queries/JournalContainerQuery';
import JournalDateContainer from 'journal/containers/JournalDateContainer';
import JournalDateContainerQuery from 'journal/queries/JournalDateContainerQuery';

// preset
import PresetsContainer from 'preset/containers/PresetsContainer';
import PresetsContainerQuery from 'preset/queries/PresetsContainerQuery';

// food
import FoodDetailContainer from 'food/containers/FoodDetailContainer';
import FoodDetailContainerQuery from 'food/queries/FoodDetailContainerQuery';
import FoodSearchContainer from 'food/containers/FoodSearchContainer';
import FoodSearchContainerQuery from 'food/queries/FoodSearchContainerQuery';

// food-selection
import EditFoodSelectionContainer from 'food-selection/containers/EditFoodSelectionContainer';
import EditFoodSelectionContainerQuery
  from 'food-selection/queries/EditFoodSelectionContainerQuery';
import CreateFoodSelectionContainer from 'food-selection/containers/CreateFoodSelectionContainer';
import CreateFoodSelectionContainerQuery
  from 'food-selection/queries/CreateFoodSelectionContainerQuery';

function setAnonymousToken () {
  localStorage.setItem('id_token', window.anonymousToken);
}

function setAuthenticatorToken () {
  localStorage.setItem('id_token', window.authenticatorToken);
  localStorage.setItem('user_uuid', '');
}

function prepareLogin (params, props) {
  const { router } = props;
  const idToken = localStorage.getItem('id_token');
  const userId = localStorage.getItem('user_uuid');

  if (
    idToken
      && userId
      && idToken !== window.anonymousToken
      && idToken !== window.authenticatorToken
  ) {
    router.replace('/profile');
  } else {
    setAuthenticatorToken();
  }

  return params;
}

function prepareAuthToken (params, props) {
  const { router, location } = props;
  const idToken = localStorage.getItem('id_token');
  const userId = localStorage.getItem('user_uuid');

  if (!idToken
    || !userId
    || idToken === window.anonymousToken
    || idToken === window.authenticatorToken) {
    router.replace({
      pathname: '/login',
      state: {
        previousPage: location.pathname,
      },
    });
  }

  return params;
}

function prepareAnonymous (params) {
  const idToken = localStorage.getItem('id_token');

  if (!idToken || idToken === window.authenticatorToken) {
    setAnonymousToken();
  }

  return params;
}

function prepareJournal (params, props) {
  const { router, location } = props;
  const date = location.pathname.split('/')[2];
  const authorizedParams = prepareAuthToken(params, props);

  if (!date) {
    let today = new Date();
    today = moment(today).format('YYYY-MM-DD');
    router.replace({
      pathname: `/journal/${today}`,
      query: location.query,
      state: location.state,
    });
  }

  return authorizedParams;
}

function prepareJournalDate (params) {
  const { date } = params;
  const newParams = { condition: { date } };

  return newParams;
}

function render ({ Component, props }) {
  if (!Component || !props) {
    return <LoadingComponent />;
  }

  return <Component {...props} />;
}

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage} prepareVariables={prepareAnonymous} >
    <Route Component={HomePage} />
    <Route
      path={'login'}
      Component={LoginPage}
      query={LoginPageQuery}
      prepareVariables={prepareLogin}
      render={render}
    />
    <Route
      path={'profile'}
      Component={ProfileContainer}
      query={ProfileContainerQuery}
      prepareVariables={prepareAuthToken}
      render={render}
    />
    <Route
      path={'journal'}
      Component={JournalContainer}
      query={JournalContainerQuery}
      prepareVariables={prepareJournal}
      render={render}
    >
      <Route
        path={':date'}
        Component={JournalDateContainer}
        query={JournalDateContainerQuery}
        prepareVariables={prepareJournalDate}
        render={render}
      >
        <Route
          path={'edit/:foodSelectionId'}
          Component={EditFoodSelectionContainer}
          query={EditFoodSelectionContainerQuery}
          render={({ Component, props }) => (Component && props && <Component {...props} />) || null} // eslint-disable-line max-len
        />
        <Route
          path={'new'}
          Component={CreateFoodSelectionContainer}
          query={CreateFoodSelectionContainerQuery}
          render={({ Component, props }) => (Component && props && <Component {...props} />) || null} // eslint-disable-line max-len
        />
      </Route>
    </Route>
    <Route
      path={'presets'}
      Component={PresetsContainer}
      query={PresetsContainerQuery}
      prepareVariables={prepareAuthToken}
      render={render}
    />
    <Route path={'foods'} >
      <Route
        Component={FoodSearchContainer}
        query={FoodSearchContainerQuery}
        prepareVariables={(params, { location }) => {
          const { query } = location;
          const foodId = query && query.id;
          const foodDescription = query && query.description;

          return { foodId, foodDescription, ...params };
        }}
        render={render}
      />
      <Route
        path={':foodId'}
        Component={FoodDetailContainer}
        query={FoodDetailContainerQuery}
        render={render}
      />
    </Route>
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
