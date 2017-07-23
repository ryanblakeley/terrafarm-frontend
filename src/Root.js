import React from 'react';
import { Environment, RecordSource, Store, Network } from 'relay-runtime';
import { Resolver } from 'found-relay';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { ClientFetcher } from 'fetcher';
import LoadingComponent from 'core/components/LoadingComponent';
import ErrorComponent from 'core/components/ErrorComponent';
import 'sanitize.css/sanitize.css';
import 'shared/styles/_fonts.css';
import 'shared/styles/_base.css';
import routes from './routes';

injectTapEventPlugin();

const clientFetcher = new ClientFetcher('/graphql-api', []);

function createResolver (fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  });

  return new Resolver(environment);
}

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({
    renderPending: () => <LoadingComponent />,
    renderError: error => {
      console.error(`Relay renderer ${error}`);
      return <ErrorComponent />; // renderArgs.retry?
    },
  }),
});

// prop.key = Math.random() for hot loader?

const Root = () => <Router resolver={createResolver(clientFetcher)} />;

export default Root;
