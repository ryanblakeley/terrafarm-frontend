import React from 'react';
import {
  Route,
  IndexRoute,
  // IndexRedirect,
} from 'react-router';

import CoreContainerTheme from './core/CoreContainer';
import Home from './home/HomePage';
import LoginPage from './login/LoginPage';
import NotFound from './not-found/NotFoundPage';
// import ProfileContainer from './profile/ProfileContainer';
// import ProfileQueries from './profile/ProfileQueries';
// import BrowseContainer from './browse/BrowseContainer';
// import BrowseQueries from './browse/BrowseQueries';
// import UserContainer from './user/UserContainer';
// import UserQueries from './user/UserQueries';
// import ResourceContainer from './resource/ResourceContainer';
// import ResourceQueries from './resource/ResourceQueries';
// import LandContainer from './land/LandContainer';
// import LandQueries from './land/LandQueries';
// import ProjectContainer from './project/ProjectContainer';
// import ProjectQueries from './project/ProjectQueries';
// import TaskContainer from './task/TaskContainer';
// import TaskQueries from './task/TaskQueries';
import Loading from './core/components/Loading';


function authBouncer (nextState, replace) {
  const idToken = localStorage.getItem('id_token');

  if (!idToken) {
    replace('/');
  }
}

function renderLoading () {
  return <Loading />;
}

const routes = (
  <Route path={'/'} component={CoreContainerTheme} >
    <IndexRoute component={Home} />
    <Route
      path={'login'}
      component={LoginPage}
    />
    { /*
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
      />
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
    */ }
    <Route path={'*'} component={NotFound} />
  </Route>
);

export default routes;
