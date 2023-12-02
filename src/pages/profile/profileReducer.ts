import { profileAPI } from '../../api/ProfileApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppThunkType } from '../../common/types/types';

const initialState: ProfileStateType = {
  _id: '',
  email: 'test@gmail.com',
  rememberMe: false,
  isAdmin: false,
  name: 'test name',
  verified: false,
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  __v: 0,
  token: '',
  tokenDeathTime: 0,
  avatar: '',
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType,
): ProfileStateType => {
  switch (action.type) {
    case 'PROFILE/UPDATE_USER_DATA':
    case 'PROFILE/SET_USER_DATA': {
      return {
        ...state,
        ...action.payload,
        publicCardPacksCount: action.payload.cardsCount,
      };
    }
    default:
      return state;
  }
};

export const setUserData = (
  email: string,
  _id: string,
  name: string,
  publicCardPacksCount: number,
  avatar: string | null,
) => {
  return {
    type: 'PROFILE/SET_USER_DATA',
    payload: { email, name, publicCardPacksCount, avatar, _id },
  } as const;
};

export const updateUserData = (name: string, avatar: string, cardsCount: string): any => {
  return {
    type: 'PROFILE/UPDATE_USER_DATA',
    payload: { name, avatar, cardsCount },
  } as const;
};

export const updateUserProfile = (): AppThunkType => async (dispatch, getState) => {
  dispatch(changeAppStatus('loading'));
  try {
    const { avatar } = getState().profile;

    const profile = await profileAPI.getData();

    dispatch(
      updateUserData(profile.data.name, avatar, profile.data.cardsCount.toString()),
    );
  } catch (err: any) {
    dispatch(setError(err?.response?.data.error));
  } finally {
    dispatch(changeAppStatus('idle'));
  }
};

export const updateUserName =
  (name: string, email: string): AppThunkType =>
  async (dispatch, getState) => {
    dispatch(changeAppStatus('loading'));
    try {
      const { avatar } = getState().profile;

      await profileAPI.updateData({ name });
      const profile = await profileAPI.getData();

      dispatch(
        updateUserData(profile.data.name, avatar, profile.data.cardsCount.toString()),
      );
    } catch (err: any) {
      dispatch(setError(err?.response?.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const updateUserAvatar =
  (avatar: string): AppThunkType =>
  async (dispatch, getState) => {
    dispatch(changeAppStatus('loading'));
    try {
      const { name, publicCardPacksCount } = getState().profile;
      const response = await profileAPI.updateData({ name, avatar });
      const updatedAvatar = response.data.updatedUser.avatar;

      dispatch(updateUserData(name, updatedAvatar, publicCardPacksCount.toString()));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type ProfileStateType = {
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
type SetUserDataType = ReturnType<typeof setUserData>;
type UpdateUserDataType = ReturnType<typeof updateUserData>;
export type ProfileActionsType = SetUserDataType | UpdateUserDataType;
