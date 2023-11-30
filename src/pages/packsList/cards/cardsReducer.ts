import { cardsApi, CardsType, GradeDataType } from '../../../api/CardsApi';
import { sortingMethods } from '../../../api/PackApi';
import { changeAppStatus, setError, setSuccess } from '../../../app/appReducer';
import { AppStateType } from '../../../app/store';
import { AppThunkType } from '../../../common/types/types';

const initState: CardsType = {
  cards: [
    {
      _id: '',
      cardsPack_id: '',
      user_id: '',
      answer: '',
      question: '',
      grade: 0,
      shots: 0,
      questionImg: '',
      answerImg: '',
      answerVideo: '',
      questionVideo: '',
      comments: 'n',
      type: '',
      rating: 0,
      more_id: '',
      created: '',
      updated: '',
      __v: 0,
      card_id: '',
    },
  ],
  packUserId: '',
  page: 1,
  pageCount: 7,
  cardsTotalCount: 1,
  minGrade: 0,
  maxGrade: 6,
  token: '',
  tokenDeathTime: null,
  params: {
    cardQuestion: '',
    page: 1,
    pageCount: 7,
    sortCards: sortingMethods.DES_UPDATE,
    cardsPack_id: undefined,
  },
};

export const cardsReducer = (state = initState, action: CardsActionsType): CardsType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS': {
      return { ...state, ...action.payload };
    }
    case 'CARDS/SET-PAGINATION': {
      return {
        ...state,
        params: { ...state.params, page: action.page, pageCount: action.pageCount },
      };
    }
    case 'CARDS/GET-PACKS-BY-TITLE': {
      return { ...state, params: { ...state.params, cardQuestion: action.title } };
    }
    case 'CARDS/SET-RESET-CARDS-PARAMS': {
      return {
        ...state,
        params: {
          ...state.params,
          cardQuestion: '',
          page: 1,
          pageCount: 7,
          sortCards: sortingMethods.DES_UPDATE,
          cardsPack_id: undefined,
        },
      };
    }
    case 'CARDS/SET-UPDATED-CARD': {
      return {
        ...state,
        cards: state.cards.map(card =>
          card.card_id === action.payload.cardId
            ? { ...card, ...action.payload.updatedGrade }
            : card,
        ),
      };
    }
    default:
      return state;
  }
};

export const setCards = (payload: CardsType) => {
  return {
    type: 'CARDS/SET_CARDS',
    payload,
  } as const;
};

export const setCardsPagination = (page: number, pageCount: number) => {
  return { type: 'CARDS/SET-PAGINATION', page, pageCount } as const;
};
export const getCardsByTitle = (title: string) => {
  return { type: 'CARDS/GET-PACKS-BY-TITLE', title } as const;
};
export const setResetCardsParams = () => {
  return { type: 'CARDS/SET-RESET-CARDS-PARAMS' } as const;
};
export const setUpdatedCard = (updatedGrade: any, cardId: string) => {
  return { type: 'CARDS/SET-UPDATED-CARD', payload: { updatedGrade, cardId } } as const;
};

export const getCards =
  (packId: string, pageCount?: number): AppThunkType =>
  async (dispatch, getState: () => AppStateType) => {
    dispatch(changeAppStatus('loading'));
    try {
      const stateParams = getState().cards.params;
      const response = await cardsApi.getCards(packId, {
        ...stateParams,
        pageCount,
      });

      // @ts-ignore
      dispatch(setCards({ cards: response.data }));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const addCard =
  (
    packId: string,
    question: string,
    answer: string,
    questionImg: string,
    pageCount?: number,
  ): AppThunkType =>
  async dispatch => {
    const card = {
      cardsPack_id: packId,
      question,
      answer,
      questionImg,
    };

    dispatch(changeAppStatus('loading'));
    try {
      await cardsApi.postCard(card);
      dispatch(getCards(packId, pageCount));
      dispatch(setSuccess('New card successfully added'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const deleteCard =
  (packId: string, cardId: string, pageCount?: number): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      await cardsApi.deleteCard({ cardId, packId });
      dispatch(getCards(packId, pageCount));
      dispatch(setSuccess('Card successfully deleted'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const changeCard =
  (
    packId: string,
    cardId: string,
    question: string,
    answer: string,
    questionImg: string,
    pageCount?: number,
  ): AppThunkType =>
  async dispatch => {
    const card = { _id: cardId, question, answer, questionImg };

    dispatch(changeAppStatus('loading'));
    try {
      await cardsApi.updateCard(card, packId);
      dispatch(getCards(packId, pageCount));
      dispatch(setSuccess('Card successfully changed'));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const putCardGrade =
  (packId: string, gradeData: GradeDataType): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      const response = await cardsApi.gradeCard(gradeData);

      dispatch(
        setUpdatedCard(response.data.updatedGrade, response.data.updatedGrade.card_id),
      );
      dispatch(getCards(packId, Infinity));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    }
  };

type SetCardsType = ReturnType<typeof setCards>;
type setPaginationType = ReturnType<typeof setCardsPagination>;
type getCardsByTitleType = ReturnType<typeof getCardsByTitle>;
type setResetCardsParamsType = ReturnType<typeof setResetCardsParams>;
type SetUpdatedCardType = ReturnType<typeof setUpdatedCard>;
export type CardsActionsType =
  | SetCardsType
  | setPaginationType
  | getCardsByTitleType
  | setResetCardsParamsType
  | SetUpdatedCardType;
