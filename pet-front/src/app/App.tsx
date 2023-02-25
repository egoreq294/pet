import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import React, { FC, useMemo, useState } from 'react';
import { AuthContext } from './contexts';
import { MainLayout } from './layouts';
import { checkIsAuth } from './utils';
import { authLink, createRefreshLink, httpLink } from '@api/apolloLinks';

export const App: FC = () => {
  const isUserAuth = checkIsAuth();
  const [isAuth, setIsAuth] = useState<boolean>(isUserAuth);

  const refreshLink = useMemo(() => createRefreshLink(setIsAuth), [setIsAuth]);

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([refreshLink, authLink, httpLink]),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <MainLayout />
      </AuthContext.Provider>
    </ApolloProvider>
  );
};
