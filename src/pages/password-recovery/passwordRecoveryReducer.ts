import { authAPI } from '../../api/AuthApi';
import { changeAppStatus, setError, setSuccess } from '../../app/appReducer';
import { AppThunkType } from '../../common/types/types';

const initState = {
  sendEmailRecovery: false,
};

export const passwordRecoveryReducer = (
  state: InitStateType = initState,
  actions: PasswordRecoveryActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'LOGIN/SET-EMAIL-SENT': {
      return { ...state, sendEmailRecovery: actions.payload.value };
    }
    default:
      return state;
  }
};

export const setEmailSent = (value: boolean) => {
  return {
    type: 'LOGIN/SET-EMAIL-SENT',
    payload: { value },
  } as const;
};

export const sendPasswordRecoveryData =
  (email: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await authAPI.requestRecoveryLink(email);
      dispatch(setEmailSent(true));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type InitStateType = typeof initState;
type SetEmailSentDataType = ReturnType<typeof setEmailSent>;
export type PasswordRecoveryActionsType = SetEmailSentDataType;
