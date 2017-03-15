import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

injectTapEventPlugin();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default; // eslint-disable-line
    render(NewRoot);
  });
}
