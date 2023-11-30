import { instance } from './instance/instance';

export const packApi = {
  getPacks(params: GetPackRequestType) {
    return instance.get<PacksDataType>(`pack`, { params: { ...params } });
  },
  addPack(cardsPack: { name: string; userId: string; isPrivate?: boolean }) {
    return instance.post<PackType>('pack', {
      name: cardsPack.name,
      userId: cardsPack.userId,
      isPrivate: cardsPack.isPrivate,
    });
  },
  deletePack(params: { id: string }) {
    return instance.delete('pack', { params });
  },
  updatePack(cardsPack: { _id: string; name: string; private?: boolean }) {
    return instance.put('pack', { cardsPack });
  },
  getPacksOfCertainUser(userId: string) {
    return instance.get<PacksDataType>(`pack?user_id=${userId}`);
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
  sortPacks?: sortingMethods;
  params: QueryParamsType;
};

export type PackType = {
  __v: number;
  _id: string;
  cardsCount: number;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  created: string;
  more_id: string;
  rating: number;
  type: string;
  updated: string;
  deckCover: string | null;
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

export enum sortingMethods {
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
