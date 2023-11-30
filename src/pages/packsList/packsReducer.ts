import { packApi, PacksDataType, sortingMethods } from '../../api/PackApi';
import { changeAppStatus, setError, setSuccess } from '../../app/appReducer';
import { AppStateType } from '../../app/store';
import { AppThunkType } from '../../common/types/types';
import { setIsLoggedIn } from '../login/loginReducer';

const initState = {
  user_id: undefined,
  cardPacks: [],
  cardPacksTotalCount: 10,
  minCardsCount: 0,
  maxCardsCount: 110,
  page: 1,
  pageCount: 7,
  search: null,
  sortPacks: sortingMethods.DES_UPDATE,
  params: {
    user_id: undefined,
    page: 1,
    pageCount: 7,
    sortPacks: sortingMethods.DES_UPDATE,
    min: 0,
    max: 110,
    cardPacksTotalCount: 10,
    packName: '',
  },
};

export const packsReducer = (
  state: InitStateType = initState,
  actions: PacksActionsType,
): InitStateType => {
  switch (actions.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, ...actions.payload };
    case 'PACKS/SET-PACKS-COUNT':
      return {
        ...state,
        params: {
          ...state.params,
          cardPacksTotalCount: actions.totalCount,
          page: actions.page,
        },
      };
    case 'PACKS/SET-MIN-MAX-COUNT': {
      return {
        ...state,
        params: { ...state.params, min: actions.min, max: actions.max },
      };
    }
    case 'PACKS/SET-PAGINATION': {
      return {
        ...state,
        params: { ...state.params, page: actions.page, pageCount: actions.pageCount },
      };
    }
    case 'PACKS/RESET-PAGE': {
      return { ...state, params: { ...state.params, page: actions.page } };
    }
    case 'PACKS/GET-PACKS-BY-TITLE': {
      return { ...state, params: { ...state.params, packName: actions.title } };
    }
    case 'PACKS/GET-PACKS-OF-CERTAIN-USER': {
      return { ...state, params: { ...state.params, user_id: actions.userId } };
    }
    case 'PACKS/GET-PACKS-OF-ALL-USER': {
      return {
        ...state,
        params: { ...state.params, user_id: undefined },
      };
    }
    case 'PACKS/SET-SORT-PACKS': {
      return { ...state, params: { ...state.params, sortPacks: actions.sortPacks } };
    }
    case 'PACKS/SET-RESET-PACKS-PARAMS': {
      return {
        ...state,
        params: {
          ...state.params,
          packName: '',
          min: 0,
          user_id: actions.userId,
          max: 110,
          page: 1,
          pageCount: 7,
          sortPacks: sortingMethods.DES_UPDATE,
          cardPacksTotalCount: 10,
        },
      };
    }
    default:
      return state;
  }
};

export const setPacks = (payload: PacksDataType) => {
  return { type: 'PACKS/SET-PACKS', payload } as const;
};
export const setPacksTotalCount = (page: number, totalCount: number) => {
  return { type: 'PACKS/SET-PACKS-COUNT', page, totalCount } as const;
};
export const setMinMaxCount = (min: number, max: number) => {
  return { type: 'PACKS/SET-MIN-MAX-COUNT', min, max } as const;
};
export const setPagination = (page: number, pageCount: number) => {
  return { type: 'PACKS/SET-PAGINATION', page, pageCount } as const;
};
export const resetPage = (page: number) => {
  return { type: 'PACKS/RESET-PAGE', page } as const;
};
export const getPacksByTitle = (title: string) => {
  return { type: 'PACKS/GET-PACKS-BY-TITLE', title } as const;
};
export const setPacksOfCertainUser = (userId: string) => {
  return { type: 'PACKS/GET-PACKS-OF-CERTAIN-USER', userId } as const;
};
export const setPacksOfAllUsers = () => {
  return { type: 'PACKS/GET-PACKS-OF-ALL-USER' } as const;
};
export const setSortPacks = (sortPacks: sortingMethods) => {
  return { type: 'PACKS/SET-SORT-PACKS', sortPacks } as const;
};
export const setResetPacksParams = (userId: string) => {
  return { type: 'PACKS/SET-RESET-PACKS-PARAMS', userId } as const;
};

export const getPacks =
  (params: any): AppThunkType =>
  async (dispatch, getState: () => AppStateType) => {
    dispatch(changeAppStatus('loading'));
    try {
      const stateParams = getState().packs.params;
      const advancedOptions = { ...stateParams, ...params };
      const response = await packApi.getPacks(advancedOptions);

      dispatch(setPacks({ ...response.data }));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
      dispatch(setIsLoggedIn(false));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const addPack =
  (
    packName: string,
    packPrivate: boolean,
    deckCover: string,
    profileUserId: string,
    currentFilter: string | null,
  ): AppThunkType =>
  async dispatch => {
    const cardsPack = {
      name: packName,
      userId: profileUserId,
      isPrivate: packPrivate,
    };

    dispatch(changeAppStatus('loading'));
    try {
      await packApi.addPack(cardsPack);
      if (currentFilter === 'My') dispatch(getPacks({ user_id: profileUserId }));
      else dispatch(getPacks({}));
      dispatch(setSuccess('New pack successfully added'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const deletePack =
  (packId: string, profileUserId: string, currentFilter: string | null): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await packApi.deletePack({ id: packId });

      if (currentFilter === 'My') dispatch(getPacks({ user_id: profileUserId }));
      else dispatch(getPacks({}));

      dispatch(setSuccess('Pack successfully deleted'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const changePack =
  (
    packId: string,
    name: string,
    packPrivate: boolean,
    deckCover: string,
    profileUserId: string,
    currentFilter: string | null,
  ): AppThunkType =>
  async dispatch => {
    const cardsPack = { _id: packId, name, private: packPrivate, deckCover };

    dispatch(changeAppStatus('loading'));
    try {
      await packApi.updatePack(cardsPack);

      if (currentFilter === 'My') dispatch(getPacks({ user_id: profileUserId }));
      else dispatch(getPacks({}));

      dispatch(setSuccess('Pack successfully changed'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type InitStateType = PacksDataType;
export type PacksActionsType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksTotalCount>
  | ReturnType<typeof setMinMaxCount>
  | ReturnType<typeof setPagination>
  | ReturnType<typeof resetPage>
  | ReturnType<typeof getPacksByTitle>
  | ReturnType<typeof setPacksOfCertainUser>
  | ReturnType<typeof setPacksOfAllUsers>
  | ReturnType<typeof setSortPacks>
  | ReturnType<typeof setResetPacksParams>;
