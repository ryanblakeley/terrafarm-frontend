import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';

// user
import UserContainer from 'user/containers/UserContainer';
import UserContainerQuery from 'user/queries/UserContainerQuery';
import UserJournalContainer from 'user/containers/UserJournalContainer';
import UserJournalContainerQuery from 'user/queries/UserJournalContainerQuery';

// food selection
import EditFoodSelectionContainer from 'food-selection/containers/EditFoodSelectionContainer';
import EditFoodSelectionContainerQuery
  from 'food-selection/queries/EditFoodSelectionContainerQuery';

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage}>
    <Route Component={HomePage} />
    <Route
      path={'user/:userId'}
      Component={UserContainer}
      query={UserContainerQuery}
    >
      <Route
        path={'food-journal'}
        Component={UserJournalContainer}
        query={UserJournalContainerQuery}
        prepareVariables={params => ({ ...params, count: 1, orderBy: 'DATE_DESC' })}
      >
        <Route
          path={'edit/:foodSelectionId'}
          Component={EditFoodSelectionContainer}
          query={EditFoodSelectionContainerQuery}
        />
      </Route>
    </Route>
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
