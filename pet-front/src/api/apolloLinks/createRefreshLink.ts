import { ApolloLink, fromPromise, toPromise } from '@apollo/client';
import { refresh } from '@api/services';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const createRefreshLink = (
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
): ApolloLink =>
  new ApolloLink((operation, forward) => {
    const accessToken = localStorage.getItem('access-token');
    if (!accessToken) {
      return forward(operation);
    }

    const parsedToken = jwtDecode<JwtPayload>(accessToken);

    if (!(Date.now() - 60 >= (parsedToken?.exp ?? 0) * 1000)) {
      return forward(operation);
    }

    return fromPromise(
      refresh()
        .then((response) => {
          const newAccessToken = response?.data?.accessToken || '';

          localStorage.setItem('access-token', newAccessToken);
          operation.setContext(({ headers }: { headers: any }) => ({
            headers: {
              ...headers,
              authorization: newAccessToken ? `Bearer ${newAccessToken}` : '',
            },
          }));

          return toPromise(forward(operation));
        })
        .catch(() => {
          setIsAuth(false);
          localStorage.setItem('access-token', '');

          return toPromise(forward(operation));
        }),
    );
  });
