import { registrationAPI, RegistrationDataType } from '../../api/RegistrationApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppThunkType } from '../../common/types/types';
import { sendLoginData } from '../login/loginReducer';

const initState = {
  send: false,
};

export const registrationReducer = (
  state: InitStateType = initState,
  actions: RegistrationActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'CHANGE-STATUS':
      return { ...state, send: actions.value };
    default:
      return state;
  }
};

export const changeStatusRegistration = (value: boolean): any => {
  return { type: 'CHANGE-STATUS', value } as const;
};

export const sendRegistrationData =
  (data: RegistrationDataType): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await registrationAPI.registration(data);
      dispatch(sendLoginData({ ...data, rememberMe: false }));
      dispatch(changeStatusRegistration(true));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };
type InitStateType = typeof initState;
export type RegistrationActionsType = ReturnType<typeof changeStatusRegistration>;
