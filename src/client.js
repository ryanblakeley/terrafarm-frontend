import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';

injectTapEventPlugin();

const mountNode = document.getElementById('root');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    mountNode,
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default; // eslint-disable-line
    render(NewRoot);
  });
}
