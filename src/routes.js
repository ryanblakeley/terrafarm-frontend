import React from 'react';
import {Route, IndexRoute} from 'react-router';

// static
import CoreContainerTheme from 'core/components/CorePage';
import LoadingComponent from 'core/components/LoadingComponent';
import ErrorComponent from 'core/components/ErrorComponent';
import HomePage from 'home/components/HomePage';
import NotFound from 'not-found/components/NotFoundPage';

// user
import UserContainer from 'user/containers/UserContainer';
// import JournalContainer from 'user/containers/JournalContainer';
import UserQueries from 'user/queries/UserQueries';

// food selection
import EditFoodSelectionForm from 'food-selection/containers/EditFoodSelectionForm';
import FoodSelectionAndUserQueries from 'food-selection/queries/FoodSelectionAndUserQueries';

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

function renderCallback ({done, error, props, retry, stale}, container) {
  if (error) {
    console.error(`Relay renderer ${error}`);
    return <ErrorComponent retry={retry} />;
  } else if (props) {
    return React.cloneElement(container, {...props});
  } else { // eslint-disable-line
    return <LoadingComponent />;
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
      path={'user/:userId'}
      component={UserContainer}
      queries={UserQueries}
      render={renderArgs => renderCallback(renderArgs, <UserContainer />)}
      onEnter={ensurePublicAccess}
    >
      <Route
        path={'edit/:foodSelectionId'}
        component={EditFoodSelectionForm}
        queries={FoodSelectionAndUserQueries}
        render={renderArgs => renderCallback(renderArgs, <EditFoodSelectionForm />)}
      />
    </Route>
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
export {renderCallback};
