import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';

// user
import UserContainer from 'user/containers/UserContainer';
// import JournalContainer from 'user/containers/JournalContainer';
import UserContainerQuery from 'user/queries/UserContainerQuery';

// food selection
// import EditFoodSelectionContainer from 'food-selection/containers/EditFoodSelectionContainer';
// import EditFoodSelectionContainerQuery
// from 'food-selection/queries/EditFoodSelectionContainerQuery';

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage}>
    <Route Component={HomePage} />
    <Route
      path={'user/:userId'}
      Component={UserContainer}
      query={UserContainerQuery}
    />
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
/*
      <Route
        path={'food-journal'}
        Component={UserJournalContainer}
        query={UserJournalContainerQuery}
      >
        <Route
          path={'edit/:foodSelectionId'}
          Component={EditFoodSelectionContainer}
          query={EditFoodSelectionContainerQuery}
        />
      </Route>
    </Route>
  </Route>
*/
