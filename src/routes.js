import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';

// journal
import UserJournalContainer from 'user/containers/UserJournalContainer';
import UserJournalContainerQuery from 'user/queries/UserJournalContainerQuery';

// food selection
import EditFoodSelectionContainer from 'food-selection/containers/EditFoodSelectionContainer';
import EditFoodSelectionContainerQuery
  from 'food-selection/queries/EditFoodSelectionContainerQuery';

// food
import FoodContainer from 'food/containers/FoodContainer';
import FoodContainerQuery from 'food/queries/FoodContainerQuery';

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage}>
    <Route Component={HomePage} />
    <Route
      path={'journal/:userId'}
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
    <Route
      path={'food/:foodId'}
      Component={FoodContainer}
      query={FoodContainerQuery}
    />
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
