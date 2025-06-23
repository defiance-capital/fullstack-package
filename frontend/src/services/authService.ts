import type { User } from '../types/user';
import apiClient from './apiClient';

export const login = async (username: string): Promise<User> => {
  const response = await apiClient.post('v1/login', { username });
  return response.data.data.user;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/v1/logout');
};
