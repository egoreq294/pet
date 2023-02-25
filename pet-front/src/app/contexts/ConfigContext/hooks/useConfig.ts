import { useContext } from 'react';
import { ConfigContext } from '../ConfigContext';

import { Config } from '../types';

export const useConfig = (): Config => useContext<Config>(ConfigContext);
