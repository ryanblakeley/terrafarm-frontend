import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';

// static
import { CorePage } from 'core/components/CorePage';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';

// journal
import JournalContainer from 'journal/containers/JournalContainer';
import JournalContainerQuery from 'journal/queries/JournalContainerQuery';
import JournalEditRecordContainer from 'journal/containers/JournalEditRecordContainer';
import JournalEditRecordContainerQuery from 'journal/queries/JournalEditRecordContainerQuery';

// food
import FoodContainer from 'food/containers/FoodContainer';
import FoodContainerQuery from 'food/queries/FoodContainerQuery';

export default makeRouteConfig(
  <Route path={'/'} Component={CorePage}>
    <Route Component={HomePage} />
    <Route
      path={'journal/:userId'}
      Component={JournalContainer}
      query={JournalContainerQuery}
    >
      <Route
        path={'edit/:foodSelectionId'}
        Component={JournalEditRecordContainer}
        query={JournalEditRecordContainerQuery}
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
