import { accessTokenService } from '../api/accessTokenService';
import { profileAPI } from '../api/ProfileApi';
import { AppThunkType } from '../common/types/types';
import { setIsLoggedIn } from '../pages/login/loginReducer';
import { setUserData } from '../pages/profile/profileReducer';

const initState = {
  status: 'idle' as RequestStatusType,
  isInitialized: false,
  error: null as string | null,
  success: null as string | null,
};

export const appReducer = (
  state: InitStateType = initState,
  actions: AppActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'APP/CHANGE-APP-STATUS':
      return { ...state, status: actions.status };
    case 'APP/SET_IS_INITIALIZED': {
      return { ...state, isInitialized: actions.payload.value };
    }
    case 'APP/SET_ERROR': {
      return { ...state, ...actions.payload };
    }
    case 'APP/SET_SUCCESS': {
      return { ...state, ...actions.payload };
    }
    default:
      return state;
  }
};

export const changeAppStatus = (status: RequestStatusType) => {
  return { type: 'APP/CHANGE-APP-STATUS', status } as const;
};

export const setIsInitialized = (value: boolean) => {
  return { type: 'APP/SET_IS_INITIALIZED', payload: { value } } as const;
};

export const setError = (error: string | null) => {
  return { type: 'APP/SET_ERROR', payload: { error } } as const;
};

export const setSuccess = (success: string | null) => {
  return { type: 'APP/SET_SUCCESS', payload: { success } } as const;
};

export const initializeApp = (): AppThunkType => async dispatch => {
  try {
    const token = accessTokenService.getToken();
    let profile;

    if (token) {
      profile = await profileAPI.getData();
      dispatch(setIsLoggedIn(true, profile?.data?.id.toString()));
      const { email, id, name, cardsCount } = profile.data;

      dispatch(setUserData(email, id.toString(), name, cardsCount, null));
    }
  } catch (err: any) {
    return;
  } finally {
    dispatch(setIsInitialized(true));
  }
};

type InitStateType = typeof initState;
type ChangeAppStatusType = ReturnType<typeof changeAppStatus>;
type SetIsInitializedType = ReturnType<typeof setIsInitialized>;
type SetErrorType = ReturnType<typeof setError>;
type setSuccessType = ReturnType<typeof setSuccess>;
export type AppActionsType =
  | ChangeAppStatusType
  | SetIsInitializedType
  | SetErrorType
  | setSuccessType;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
