import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

import { AuthContextType } from '../types';

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext);
