import { instance } from './instance/instance';

export const profileAPI = {
  getData() {
    return instance.get<UpdateUserResponseType>('auth/profile');
  },
  updateData(data: UpdateDataType) {
    return instance.patch<UpdateUserResponseType>('auth/profile', data);
  },
};

type UpdateDataType = {
  name: string;
  avatar?: string;
};

type UpdatedProfile = {
  cardsCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  name: string;
  id: number;
  password: string;
};

type UpdateUserResponseType = {
  updatedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
  };
  token: string;
  tokenDeathTime: number;
};

export type SetNewPasswordType = {
  info: string;
  error: string;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
