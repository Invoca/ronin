import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import App from './containers/App';
import messageApp from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ),
  devTools()
)(createStore);

const store = createStoreWithMiddleware(messageApp);

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);

    // <DebugPanel top right bottom>
    //   <DevTools store={store} monitor={LogMonitor} />
    // </DebugPanel>