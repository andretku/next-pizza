import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export const getMe = async (): Promise<User> => {
  return (await axiosInstance.get<User>('/auth/me')).data;
};
