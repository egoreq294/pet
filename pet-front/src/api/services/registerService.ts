import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { AuthResponse } from './types';

type Register = {
  email: string;
  password: string;
  fullName: string;
};

export const register = async ({
  email,
  password,
  fullName,
}: Register): Promise<AxiosResponse<AuthResponse>> =>
  axiosInstance.post<AuthResponse>('/register', { email, password, fullName });
