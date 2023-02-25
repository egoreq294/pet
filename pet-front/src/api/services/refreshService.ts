import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { AuthResponse } from './types';

export const refresh = async (): Promise<AxiosResponse> =>
  axiosInstance.post<AuthResponse>('/refresh');
