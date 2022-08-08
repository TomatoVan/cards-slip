import { packApi, PacksDataType, PackType, sortPacks } from '../../api/PackApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppStateType } from '../../app/store';
import { AppThunkType } from '../../common/types/types';

const initState = {
  user_id: undefined,
  cardPacks: [], // all packs
  cardPacksTotalCount: 10, // all packs count
  minCardsCount: 0, // min cards number
  maxCardsCount: 110, // max cards number
  page: 1, // for pagination
  pageCount: 10, // count element ui (number of  packs on page)
  search: null,
  sortPacks: sortPacks.DES_UPDATE,
  token: '',
  tokenDeathTime: null,
  params: {
    user_id: undefined,
    page: 1,
    pageCount: 10, // 10/25/50
    sortPacks: sortPacks.DES_UPDATE,
    min: 0, // min cards for selector
    max: 110, // max cards for selector
    cardPacksTotalCount: 10, // all
    packName: '', // search
  },
};

export const packsReducer = (
  state: InitStateType = initState,
  action: PacksActionsType,
): InitStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, ...action.payload };
    case 'PACKS/SET-PACKS-COUNT':
      return {
        ...state,
        params: {
          ...state.params,
          cardPacksTotalCount: action.totalCount,
          page: action.page,
        },
      };
    case 'PACKS/SET-MIN-MAX-COUNT': {
      return {
        ...state,
        params: { ...state.params, min: action.min, max: action.max },
      };
    }
    case 'PACKS/SET-PAGINATION': {
      return {
        ...state,
        params: { ...state.params, page: action.page, pageCount: action.pageCount },
      };
    }
    case 'PACKS/RESET-PAGE': {
      return { ...state, params: { ...state.params, page: action.page } };
    }
    case 'PACKS/GET-PACKS-BY-TITLE': {
      return { ...state, params: { ...state.params, packName: action.title } };
    }
    case 'PACKS/GET-PACKS-OF-CERTAIN-USER': {
      return { ...state, params: { ...state.params, user_id: action.userId } };
    }
    case 'PACKS/GET-PACKS-OF-ALL-USER': {
      return {
        ...state,
        params: { ...state.params, user_id: undefined, min: 0, max: 110 },
      };
    }
    case 'PACKS/SET-PACKS-BY-ORDER': {
      return { ...state, cardPacks: action.payload.sortedPacks };
    }
    default:
      return state;
  }
};

export const setPacks = (payload: any) => {
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
export const setPacksOfCertainUser = (userId: any) => {
  return { type: 'PACKS/GET-PACKS-OF-CERTAIN-USER', userId } as const;
};
export const setPacksOfAllUsers = () => {
  return { type: 'PACKS/GET-PACKS-OF-ALL-USER' } as const;
};
export const setPacksByOrder = (sortedPacks: PackType[]) => {
  return { type: 'PACKS/SET-PACKS-BY-ORDER', payload: { sortedPacks } } as const;
};

export const getPacksByOrder =
  (): AppThunkType => async (dispatch, getState: () => AppStateType) => {
    dispatch(changeAppStatus('loading'));
    try {
      const sortBy = getState().packs.sortPacks;

      if (sortBy) {
        const response = await packApi.getPacksByOrder(sortBy);

        dispatch(setPacksByOrder(response.data.cardPacks));
      }
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
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
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const addPack = (): AppThunkType => async dispatch => {
  const cardsPack = { name: 'Test123', private: false };

  dispatch(changeAppStatus('loading'));
  try {
    await packApi.addPack(cardsPack);
    dispatch(getPacks({}));
  } catch (err: any) {
    dispatch(setError(err.response.data.error));
  } finally {
    dispatch(changeAppStatus('idle'));
  }
};

export const deletePack =
  (packId: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await packApi.deletePack({ id: packId });
      dispatch(getPacks({}));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const changePackName =
  (packId: string, name: string): AppThunkType =>
  async dispatch => {
    const cardsPack = { _id: packId, name };

    dispatch(changeAppStatus('loading'));
    try {
      await packApi.updatePack(cardsPack);
      dispatch(getPacks({}));
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
  | ReturnType<typeof setPacksByOrder>;
