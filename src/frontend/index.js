/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {RelayRouter} from 'react-router-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';

import CoreContainer from './core/CoreContainer';
import Home from './home/HomePage';
import LoginPage from './login/LoginPage';
import AuthorizeContainer from './login/components/AuthorizeContainer';
import AuthorizeQueries from './login/components/AuthorizeQueries';
import NotFound from './not-found/NotFoundPage';
import ProfileContainer from './profile/ProfileContainer';
import ProfileQueries from './profile/ProfileQueries';
import BrowseContainer from './browse/BrowseContainer';
import BrowseQueries from './browse/BrowseQueries';
import UserContainer from './user/UserContainer';
import UserQueries from './user/UserQueries';
import ResourceContainer from './resource/ResourceContainer';
import ResourceQueries from './resource/ResourceQueries';
import LandContainer from './land/LandContainer';
import LandQueries from './land/LandQueries';
import EditLandContainer from './land/components/EditLandContainer';
import EditLandQueries from './land/components/EditLandQueries';
import NewProjectContainer from './land/components/NewProjectContainer';
import NewProjectQueries from './land/components/NewProjectQueries';
import OfferResourceToLandContainer from './land/components/OfferResourceToLandContainer';
import OfferResourceToLandQueries from './land/components/OfferResourceToLandQueries';
import RequestResourceForLandContainer from './land/components/RequestResourceForLandContainer';
import RequestResourceForLandQueries from './land/components/RequestResourceForLandQueries';
import ProjectContainer from './project/ProjectContainer';
import ProjectQueries from './project/ProjectQueries';
import TaskContainer from './task/TaskContainer';
import TaskQueries from './task/TaskQueries';
import Loading from './core/components/Loading';

injectTapEventPlugin();

function authBouncer (nextState, replace) {
  const idToken = localStorage.getItem('id_token');

  if (!idToken) {
    replace('/');
  }
}

function renderLoading () {
  return <Loading />;
}

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route path={'/'} component={CoreContainer} >
      <IndexRoute component={Home} />
      <Route path={'login'} component={LoginPage} >
        <Route
          path={'authorize'}
          component={AuthorizeContainer}
          queries={AuthorizeQueries}
        />
      </Route>
      <Route
        path={'profile'}
        component={ProfileContainer}
        queries={ProfileQueries}
        onEnter={authBouncer}
        renderLoading={renderLoading}
      />
      <Route
        path={'browse'}
        component={BrowseContainer}
        queries={BrowseQueries}
        onEnter={authBouncer}
        renderLoading={renderLoading}
      />
      <Route path={'user'} onEnter={authBouncer} >
        <Route
          path={':userId'}
          component={UserContainer}
          queries={UserQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'resource'} onEnter={authBouncer} >
        <Route
          path={':resourceId'}
          component={ResourceContainer}
          queries={ResourceQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'land'} onEnter={authBouncer} >
        <Route
          path={':landId'}
          component={LandContainer}
          queries={LandQueries}
          renderLoading={renderLoading}
        >
          <Route
            path={'edit'}
            component={EditLandContainer}
            queries={EditLandQueries}
            renderLoading={renderLoading}
          />
          <Route
            path={'new-project'}
            component={NewProjectContainer}
            queries={NewProjectQueries}
            renderLoading={renderLoading}
          />
          <Route
            path={'offer-resource'}
            component={OfferResourceToLandContainer}
            queries={OfferResourceToLandQueries}
            renderLoading={renderLoading}
          />
        </Route>
      </Route>
      <Route path={'project'} onEnter={authBouncer} >
        <Route
          path={':projectId'}
          component={ProjectContainer}
          queries={ProjectQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'task'} onEnter={authBouncer} >
        <Route
          path={':taskId'}
          component={TaskContainer}
          queries={TaskQueries}
          renderLoading={renderLoading}
        />
      </Route>
      <Route path={'*'} component={NotFound} />
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
