import './index.css';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

const httpLink = new HttpLink({
  uri: 'http://localhost:8010/proxy',
});

const link = ApolloLink.from([httpLink]);

const client = new ApolloClient({
  link: link,
  headers: {
    'content-type': 'application/json',
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
