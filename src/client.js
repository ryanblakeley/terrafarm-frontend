import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const mountNode = document.getElementById('root');
// document.createElement('div');
// document.body.appendChild(mountNode);

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
