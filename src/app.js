import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from 'components/App.jsx';
import Container from 'components/Container.jsx';

const networkInterface = createNetworkInterface('http://localhost:4000/api');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = localStorage.getItem('switchboard:user') ? localStorage.getItem('switchboard:user') : null;
    next();
  }
}]);

const dataIdFromObject = (result) => result.__typename + ':' + result.id;

const queryTransformer = addTypename;

const client = new ApolloClient({networkInterface, dataIdFromObject, queryTransformer});


const store = createStore(
  combineReducers({
    apollo: client.reducer()
  }), compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="test" component={Container} />
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
