import { createHttpLink } from '@apollo/client';

export const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});
