import {
    REMOVE_REPOSITORIES,
    ADD_REPOSITORY,
    SELECT_REPOSITORIES,
    UPDATE_REPOSITORIES,

    REMOVE_USERS,
    ADD_USER,
    SELECT_USER,

    GET_STATISTICS
} from './actionTypes';

export const removeRepositories = ids => ({ type: REMOVE_REPOSITORIES, payload: ids });
export const addRepository = itemObject => ({ type: ADD_REPOSITORY, payload: itemObject });
export const selectRepositories = (ids, value) => ({ type: SELECT_REPOSITORIES, payload: {ids, value} });
export const updateRepositories = items => ({type: UPDATE_REPOSITORIES, payload: items });

export const removeUsers = ids => ({ type: REMOVE_USERS, payload: ids });
export const addUser = itemObject => ({ type: ADD_USER, payload: itemObject });
export const selectUsers = (ids, value) => ({ type: SELECT_USER, payload: {ids, value} });

export const getStatistics = params => ({type: GET_STATISTICS, payload: params});