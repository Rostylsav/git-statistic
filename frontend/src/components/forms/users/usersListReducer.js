import {
    REMOVE_USERS,
    ADD_USER,
    SELECT_USER
} from '../../../actions/actionTypes';

const initState = [];

const usersListReducer =  (state = initState, action) => {
    switch (action.type) {
        case ADD_USER: 
            return  [...state, action.payload]
        case REMOVE_USERS: {
            const selectedRepoIds = action.payload.map( repo => repo.id);
            return [ ...state.filter( repo => !selectedRepoIds.includes(repo.id))]
        }
        case SELECT_USER: {
            const {ids, value} = action.payload;
            return [ ...state.map( repo => {
                repo.isChecked = ids.includes(repo.id) ? value : repo.isChecked;
                return repo
            })]
        }
        default:
            return state;
    }
};

export default usersListReducer;