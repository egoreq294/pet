import { createContext } from 'react';
import { INITIAL_CONFIG } from './constants';
import { Config } from './types';

export const ConfigContext = createContext<Config>(INITIAL_CONFIG);
