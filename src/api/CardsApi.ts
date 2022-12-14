import { instance } from './instance/instance';

export const cardsApi = {
  getCards(packId: string, params: CardsParamsType) {
    return instance.get<CardsType>(`cards/card?cardsPack_id=${packId}`, {
      params: { ...params },
    });
  },
  postCard(card: {
    cardsPack_id: string;
    question: string;
    answer: string;
    questionImg: string;
  }) {
    return instance.post(`cards/card`, { card });
  },
  deleteCard(params: { id: string }) {
    return instance.delete('cards/card', { params });
  },
  updateCard(card: {
    _id: string;
    question: string;
    answer?: string;
    questionImg: string;
  }) {
    return instance.put('cards/card', { card });
  },
  gradeCard(gradeData: GradeDataType) {
    return instance.put<UpdatedGradeType>('cards/grade', gradeData);
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
