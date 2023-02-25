export const checkIsAuth = (): boolean =>
  !!localStorage.getItem('access-token');
