import { ApolloLink, createHttpLink } from '@apollo/client';

export const getHttpLink = (uri: string): ApolloLink =>
  createHttpLink({
    uri,
    credentials: 'include',
  });
