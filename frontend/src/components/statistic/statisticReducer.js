import {
    GET_STATISTICS_DONE
} from '../../actions/actionTypes';

const initState = {};

const statisticReducer =  (state = initState, action) => {
    switch (action.type) {
        case GET_STATISTICS_DONE:
            return {...state}
        default:
            return state;
    }
};

export default statisticReducer;