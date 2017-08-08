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
import SelectionPossibleFoods from 'journal/containers/SelectionPossibleFoods';
import SelectionPossibleFoodsQuery from 'journal/queries/SelectionPossibleFoodsQuery';

// food
import FoodDetailContainer from 'food/containers/FoodDetailContainer';
import FoodDetailContainerQuery from 'food/queries/FoodDetailContainerQuery';

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
      >
        <Route
          Component={SelectionPossibleFoods}
          query={SelectionPossibleFoodsQuery}
          prepareVariables={params => ({ matchesCount: 4, ...params })}
        />
      </Route>
    </Route>
    <Route path={'food'}>
      <Route
        path={'detail/:foodId'}
        Component={FoodDetailContainer}
        query={FoodDetailContainerQuery}
      />
    </Route>
    <Route path={'*'} Component={NotFound} />
  </Route>,
);
