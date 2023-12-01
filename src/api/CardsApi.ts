import { instance } from './instance/instance';

export const cardsApi = {
  getCards(packId: string, params: CardsParamsType) {
    return instance.get<CardsType>(`pack/${packId}/card`, {
      params: { ...params },
    });
  },
  postCard(card: {
    cardsPack_id: string;
    question: string;
    answer: string;
    questionImg: string;
  }) {
    return instance.post(`pack/${card.cardsPack_id}/card`, {
      question: card.question,
      answer: card.answer,
      packId: Number(card.cardsPack_id),
    });
  },
  deleteCard(params: { cardId: string; packId: string }) {
    return instance.delete(`pack/${params.packId}/card/${params.cardId}`);
  },
  updateCard(
    card: {
      _id: string;
      question: string;
      answer?: string;
      questionImg: string;
    },
    packId: string,
  ) {
    return instance.patch(`pack/${packId}/card/${card._id}`, {
      question: card.question,
      answer: card.answer,
      packId: Number(packId),
    });
  },
  gradeCard(packId: string, cardId: string, grade: number, shots: number) {
    return instance.patch<Array<number>>(`pack/${packId}/card/${cardId}/grade`, {
      grade,
      shots: shots ? Number(shots) + 1 : 1,
    });
  },
};

export type CardsParamsType = {
  cardQuestion?: string;
  page?: number;
  pageCount?: number;
  sortCards?: string;
  cardsPack_id?: string;
};

export type CardsType = {
  cards: CardType[];
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number | null;
  params: CardsParamsType;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  answerVideo: string;
  questionVideo: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  card_id: string;
};

export type GradeDataType = {
  grade: number;
  card_id: string;
};

export type UpdatedGradeType = {
  token: string;
  tokenDeathTime: number;
  updatedGrade: {
    __v: number;
    _id: string;
    card_id: string;
    cardsPack_id: string;
    created: string;
    grade: number;
    more_id: string;
    shots: number;
    updated: string;
    user_id: string;
  };
};
