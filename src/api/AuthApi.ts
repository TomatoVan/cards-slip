import { instance } from './instance/instance';

export const authAPI = {
  authMe() {
    return instance.post<UserResponseType>('auth/me', {});
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me', {});
  },
  login(data: LoginDataType) {
    return instance.post<{ access_token: string }>('auth/login', data);
  },
  requestRecoveryLink(email: string) {
    return instance.post<SetNewPasswordType>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      {
        email,
        from: 'PacksList slip 🤹🏼 <admin@gmail.com>',
        message: `<div style="background-color: lime; padding: 15px">
                            password recovery link:<a href='https://tomatovan.github.io/cards-slip/#/set-new-password/$token$'> link</a>
                          </div>`,
      },
    );
  },
  requestNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<SetNewPasswordType>('auth/set-new-password', {
      password,
      resetPasswordToken,
    });
  },
};

type UserResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};

type LogoutResponseType = {
  info: string;
  error: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type SetNewPasswordType = {
  info: string;
  error: string;
};
