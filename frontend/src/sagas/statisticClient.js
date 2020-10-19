import { takeEvery, put } from 'redux-saga/effects';
import callStatisticApi from '../apis/statisticApi';

import {GET_STATISTICS, GET_STATISTICS_DONE, GET_STATISTICS_FAILED} from '../actions/actionTypes';

function* getStatistic(action) {    
    try {
        const response = yield callStatisticApi(action.payload)
        yield put({type: GET_STATISTICS_DONE, payload: response.data});
    } catch (err) {
        yield put({type: GET_STATISTICS_FAILED, message: err.message});
    }
}

function* statisticClient() {
  yield takeEvery(GET_STATISTICS, getStatistic);
}

export default statisticClient;