import { instance } from './instance/instance';

export const packApi = {
  getPacks(params: GetPackRequestType) {
    return instance.get<PacksDataType>(`cards/pack`, { params: { ...params } });
  },
  addPack(cardsPack: { name: string; deckOver?: string; private?: boolean }) {
    return instance.post<PackType>('cards/pack', { cardsPack });
  },
  deletePack(params: { id: string }) {
    return instance.delete('cards/pack', { params });
  },
  updatePack(cardsPack: { _id: string; name: string }) {
    return instance.put('cards/pack', { cardsPack });
  },

  getCards(packId: string) {
    return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${packId}`);
  },
};

export type GetPackRequestType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type PacksDataType = {
  user_id: string | undefined;
  cardPacks: PackType[];
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  page: number;
  pageCount: number;
  search?: string | null;
  sortPacks?: sortPacks;
  params: QueryParamsType;
};

export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  created: string;
  more_id: string;
  rating: number;
  type: string;
  updated: string;
  __v: number;
};

export type CardsResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

type CardsType = {
  _id: string;
  user_id: string;
  user_name: string;
  rating: number;
  name: string;
  cardsCount: number;
  created: Date;
  updated: Date;
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
};

export type QueryParamsType = {
  user_id: string | undefined;
  page: number;
  pageCount: number;
  sortPacks: string;
  min?: number;
  max?: number;
  cardPacksTotalCount: number;
  packName: string;
};

export enum sortPacks {
  ASC_USER_NAME = '1user_name',
  DES_USER_NAME = '0user_name',
  ASC_NAME = '1name',
  DES_NAME = '0name',
  ASC_CARDS_COUNT = '1cardsCount',
  DES_CARDS_COUNT = '0cardsCount',
  ASC_CREATED = '1created',
  DES_CREATED = '0created',
  ASC_UPDATE = '1updated',
  DES_UPDATE = '0updated',
}
