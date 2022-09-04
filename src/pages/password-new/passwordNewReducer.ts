import { authAPI } from '../../api/AuthApi';
import { changeAppStatus, setError, setSuccess } from '../../app/appReducer';
import { AppThunkType } from '../../common/types/types';

const initState = {
  passwordChanged: false,
};

export const passwordNewReducer = (
  state: InitStateType = initState,
  actions: PasswordNewActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'SET-PASSWORD-CHANGED': {
      return { ...state, passwordChanged: actions.payload.value };
    }
    default:
      return state;
  }
};

export const setPasswordChanged = (value: boolean) => {
  return {
    type: 'SET-PASSWORD-CHANGED',
    payload: { value },
  } as const;
};

export const sendResetPassword =
  (password: string, token: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await authAPI.requestNewPassword(password, token);
      dispatch(setPasswordChanged(true));
      dispatch(setSuccess('Password successfully changed'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type InitStateType = typeof initState;
type setPasswordChangedType = ReturnType<typeof setPasswordChanged>;
export type PasswordNewActionsType = setPasswordChangedType;
