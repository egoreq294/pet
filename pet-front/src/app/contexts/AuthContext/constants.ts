import { AuthContextType } from './types';

export const AUTH_CONTEXT_DEFAULT_VALUES: AuthContextType = {
  isAuth: true,
  setIsAuth: (): void => {},
};
