import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers, ...context }) => {
  const token = localStorage.getItem('access-token') || '';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    ...context,
  };
});
