import {REMOVE_ITEMS, ADD_ITEM} from './actionTypes';

export const removeItems = ids => ({ type: REMOVE_ITEMS, payload: { ids }});
export const addItem = itemObject => ({ type: ADD_ITEM, payload: itemObject });