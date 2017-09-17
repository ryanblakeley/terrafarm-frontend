import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';
import LoadingComponent from 'core/components/LoadingComponent';

// user
import UserContainer from 'user/containers/UserContainer';
import UserContainerQuery from 'user/queries/UserContainerQuery';

// journal
import JournalContainer from 'journal/containers/JournalContainer';
import JournalContainerQuery from 'journal/queries/JournalContainerQuery';
import JournalEditRecordContainer from 'journal/containers/JournalEditRecordContainer';
import JournalEditRecordContainerQuery from 'journal/queries/JournalEditRecordContainerQuery';

// preset
import PresetsContainer from 'preset/containers/PresetsContainer';
import PresetsContainerQuery from 'preset/queries/PresetsContainerQuery';

// food
import FoodDetailContainer from 'food/containers/FoodDetailContainer';
import FoodDetailContainerQuery from 'food/queries/FoodDetailContainerQuery';
import FoodSearchContainer from 'food/containers/FoodSearchContainer';
import FoodSearchContainerQuery from 'food/queries/FoodSearchContainerQuery';

function ensureDeveloperToken () {
  const idToken = localStorage.getItem('id_token');
  const needsReset = !idToken || idToken !== window.developerToken;

  if (needsReset) {
    localStorage.setItem('id_token', window.developerToken);
  }
}

function render ({ Component, props }) { // eslint-disable-line react/prop-types
  ensureDeveloperToken();

  if (!Component || !props) {
    return <LoadingComponent />;
  }

  return <Component {...props} />;
}

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage}>
    <Route Component={HomePage} />
    <Route path={'user/:userId'} >
      <Route
        Component={UserContainer}
        query={UserContainerQuery}
        render={render}
      />
      <Route path={'journal'} >
        <Route
          Component={JournalContainer}
          query={JournalContainerQuery}
          render={render}
        >
          <Route
            path={'edit/:foodSelectionId'}
            Component={JournalEditRecordContainer}
            query={JournalEditRecordContainerQuery}
          />
        </Route>
      </Route>
      <Route
        path={'presets'}
        Component={PresetsContainer}
        query={PresetsContainerQuery}
        render={render}
      />
    </Route>
    <Route path={'food'} >
      <Route
        Component={FoodSearchContainer}
        query={FoodSearchContainerQuery}
        prepareVariables={(params, { location }) => {
          const { query } = location;
          const foodId = query && query.id;
          const foodDescription = query && query.description;

          return { foodId, foodDescription, ...params };
        }}
      />
      <Route
        path={':foodId'}
        Component={FoodDetailContainer}
        query={FoodDetailContainerQuery}
      />
    </Route>
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
