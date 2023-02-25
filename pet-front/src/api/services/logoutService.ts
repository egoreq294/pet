import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { AuthResponse } from './types';

export const logout = async (): Promise<AxiosResponse> =>
  axiosInstance.post<AuthResponse>('/logout');
