import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { AuthContext } from './contexts';
import { MainLayout } from './layouts';
import { checkIsAuth } from './utils';
import { authLink, createRefreshLink, getHttpLink } from '@api/apolloLinks';
import axios, { AxiosResponse } from 'axios';
import { Config, ConfigContext } from './contexts/ConfigContext';
import { INITIAL_CONFIG } from './contexts/ConfigContext/constants';
import { Alert } from 'antd';

export const App: FC = () => {
  const isUserAuth = checkIsAuth();
  const [isAuth, setIsAuth] = useState<boolean>(isUserAuth);
  const [failed, setFailed] = useState<boolean>(false);
  const [appConfig, setAppConfig] = useState<Config>(INITIAL_CONFIG);
  const [apolloClient, setApolloClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    axios
      .get(`/environment.json?t=${Date.now()}`)
      .then(({ data: remoteConfig }: AxiosResponse<Config>) => {
        setAppConfig(remoteConfig);
      })
      .catch(() => {
        setFailed(true);
      });
  }, []);

  useEffect(() => {
    if (!appConfig.graphql.baseUrl) {
      return;
    }

    const httpLink = getHttpLink(appConfig.graphql.baseUrl);
    const refreshLink = createRefreshLink(setIsAuth);

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([refreshLink, authLink, httpLink]),
    });

    setApolloClient(client);
  }, [appConfig]);

  if (failed) {
    return <Alert message="Ошибка загрузки конфигурации" type="error" />;
  }

  if (!apolloClient) {
    return <Alert message="Идет загрузка конфигурации..." type="error" />;
  }

  return (
    <ConfigContext.Provider value={appConfig}>
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <MainLayout />
        </AuthContext.Provider>
      </ApolloProvider>
    </ConfigContext.Provider>
  );
};
