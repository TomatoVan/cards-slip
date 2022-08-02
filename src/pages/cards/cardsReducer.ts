import {AppThunkType} from "../../hooks/hooks";
import {cardsAPI, PacksDataType, sortPacks} from "../../api/CardsApi";

const initState = {
	user_id: undefined, // pack id
	cardPacks: [], // all packs
	cardPacksTotalCount: 10, // all packs count
	minCardsCount: 0, // min cards number
	maxCardsCount: 110, // max cards number
	page: 1, // for pagination
	pageCount: 10, // count element ui (number of  packs on page)
	search: null,
	sortPacks: sortPacks.DES_UPDATE,
	params: {
		user_id: undefined,
		page: 1,
		pageCount: 10, // 10/25/50
		sortPacks: '0updated',
		min: 0, // min cards for selector
		max: 80, // max cards for selector
		cardPacksTotalCount: 10, //all
		packName: '',
	}

}
export const cardsReducer = (state: InitStateType = initState, actions: CardsActionsType): InitStateType => {
    switch (actions.type) {
        case "SET-PACKS":
            return {...state, ...actions.payload}
        case "SET-PACKS-COUNT":
            return {...state, params:{...state.params, cardPacksTotalCount: actions.value} }
		case "SET-MIN-MAX-COUNT": {
			return {...state, params: {...state.params, min: actions.min, max: actions.max}}
		}
		case "SET-PAGINATION": {
			return {...state, params: {...state.params, page: actions.page, pageCount: actions.pageCount}}
		}
		case "RESET-PAGE": {
			return {...state, params: {...state.params,page: actions.page}}
		}
		case "GET-PACKS-BY-TITLE": {
			return {...state, params: {...state.params,packName: actions.title}}
		}
		default:
            return state
    }
}

export const setPacks = (payload: any) => {
    return {type: 'SET-PACKS', payload} as const
}
export const setPacksTotalCount = (value: number) => {
    return {type: 'SET-PACKS-COUNT', value} as const
}
export const setMinMaxCount = (min: number, max: number) => {
	return {type: 'SET-MIN-MAX-COUNT', min, max} as const
}
export const setPagination = (page: number, pageCount: number) => {
	return {type: 'SET-PAGINATION', page, pageCount} as const
}
export const resetPage = (page: number) => {
	return {type: 'RESET-PAGE', page} as const
}
export const getPacksByTitle = (title: string) => {
	return {type: 'GET-PACKS-BY-TITLE', title} as const
}

export const fetchGetPacks = (params: any): AppThunkType => (dispatch, getState) => {
	let stateParams = getState().cards.params
	let advancedOptions = {...stateParams,  ...params};

	cardsAPI.getPacks(advancedOptions)
		.then((res) => {
			dispatch(setPacks({...res.data}));
		})
}

export const addPack = (): AppThunkType => (dispatch) => {
	const cardsPack = {name: 'Test123', private: false}
	cardsAPI.addPack(cardsPack)
		.then((res) => {
			console.log(res)
		})
}

export const fetchCards = (packId: string): AppThunkType => (dispatch) => {
	cardsAPI.getCards(packId)
		.then((res) => {
			console.log(res.data)
		})
}

type InitStateType = PacksDataType
type setCardsChangedType = ReturnType<typeof setPacks> | ReturnType<typeof setPacksTotalCount> | ReturnType<typeof setMinMaxCount> | ReturnType<typeof setPagination> | ReturnType< typeof resetPage> | ReturnType< typeof getPacksByTitle>
export type CardsActionsType = setCardsChangedType
