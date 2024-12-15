/* eslint-disable @tanstack/query/exhaustive-deps */
import { User } from '@shared/types/types';
import { useQuery } from '@tanstack/react-query';
import { InitData } from '@telegram-apps/bridge';
import axios from 'axios';

export type UserResponse = {
  status: string;
  success: boolean;
  user: User;
};

type RequestData = {
  initData: InitData | undefined;
  wallet?: string | undefined;
};

export const useAuth = ({ initData, wallet }: RequestData) => {
  return useQuery({
    queryKey: ['user' + initData?.user?.id],
    queryFn: async () => {
      if (!initData || !initData.user) throw new Error('User not found');

      const {
        hash,
        user: { id, firstName, lastName, username },
      } = initData;

      if (!wallet) {
        const { data, status, statusText } = await axios.post<UserResponse>('/api/user', {
          id,
          username,
          firstName,
          lastName,
          hash,
        });

        if (status !== 200) throw new Error(statusText);
        return data.user;
      }

      const { data, status, statusText } = await axios.post<UserResponse>('/api/user', {
        id,
        username,
        firstName,
        lastName,
        wallet: wallet,
        hash,
      });

      if (status !== 200) throw new Error(statusText);
      return data.user;
    },

    enabled: !!(initData && initData.user && wallet),
    staleTime: Infinity,
  });
};
