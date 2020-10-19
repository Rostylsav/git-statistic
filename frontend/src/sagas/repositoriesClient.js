import { takeEvery, put } from 'redux-saga/effects';
import getStatuses from '../apis/repositoriesApi';

import {UPDATE_REPOSITORIES, GET_STATUSES_DONE, GET_STATUSES_FAILED} from '../actions/actionTypes';

function* getStatus(action) {    
    try {
        const response = yield getStatuses(action.payload)
        yield put({type: GET_STATUSES_DONE, payload: response.data});
    } catch (err) {
        yield put({type: GET_STATUSES_FAILED, message: err.message});
    }
}

function* repositoriesClient() {
  yield takeEvery(UPDATE_REPOSITORIES, getStatus);
}

export default repositoriesClient;