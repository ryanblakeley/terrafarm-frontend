/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {RelayRouter} from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

import CoreContainer from './core/CoreContainer';
import Home from './core/components/home/HomePage';
import About from './core/components/about/AboutPage';
import NotFound from './core/components/not-found/NotFoundPage';
import AuthContainer from './auth/AuthContainer';
import AuthQueries from './auth/AuthQueries';
import ProfileContainer from './profile/ProfileContainer';
import ProfileQueries from './profile/ProfileQueries';
import BrowseContainer from './browse/BrowseContainer';
import BrowseQueries from './browse/BrowseQueries';
import UserContainer from './user/UserContainer';
import UserQueries from './user/UserQueries';
import ResourceContainer from './resource/ResourceContainer';
import ResourceQueries from './resource/ResourceQueries';
import GroupContainer from './group/GroupContainer';
import GroupQueries from './group/GroupQueries';
import Loading from './core/components/Loading';

injectTapEventPlugin();

function authBouncer (nextState, replace) {
  const idToken = localStorage.getItem('id_token');
  if (!idToken) {
    replace('');
  }
}

function renderLoading () {
  return <Loading />;
}

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route path={'/'} component={CoreContainer} >
      <IndexRedirect to={'home'} />
      <Route path={'home'} component={Home} />
      <Route path={'about'} component={About} />
      <Route
        path={'auth'}
        component={AuthContainer}
        queries={AuthQueries}
        onEnter={authBouncer}
        renderLoading={renderLoading}
      >
        <IndexRoute component={Home} />
        <Route
          path={'profile'}
          component={ProfileContainer}
          queries={ProfileQueries}
          renderLoading={renderLoading}
        />
        <Route
          path={'browse'}
          component={BrowseContainer}
          queries={BrowseQueries}
          renderLoading={renderLoading}
        />
        <Route
          path={'user/:userId'}
          component={UserContainer}
          queries={UserQueries}
          renderLoading={renderLoading}
        />
        <Route
          path={'resource/:resourceId'}
          component={ResourceContainer}
          queries={ResourceQueries}
          renderLoading={renderLoading}
        />
        <Route
          path={'group/:groupId'}
          component={GroupContainer}
          queries={GroupQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'*'} component={NotFound} />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
