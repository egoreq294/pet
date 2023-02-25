import { createContext } from 'react';
import { AUTH_CONTEXT_DEFAULT_VALUES } from './constants';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>(
  AUTH_CONTEXT_DEFAULT_VALUES,
);
