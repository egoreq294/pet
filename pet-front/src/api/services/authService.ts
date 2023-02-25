import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { AuthResponse } from './types';

type Auth = {
  email: string;
  password: string;
};

export const auth = async ({
  email,
  password,
}: Auth): Promise<AxiosResponse<AuthResponse>> =>
  axiosInstance.post<AuthResponse>('/auth', { email, password });
