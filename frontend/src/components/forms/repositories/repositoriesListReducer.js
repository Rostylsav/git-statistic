import {
    ADD_REPOSITORY,
    REMOVE_REPOSITORIES,
    SELECT_REPOSITORIES,
    GET_STATUSES_DONE
} from '../../../actions/actionTypes';

const initState = [];

const repositoriesListReducer =  (state = initState, action) => {
    switch (action.type) {
        case ADD_REPOSITORY: 
            return  [...state, action.payload]
        case REMOVE_REPOSITORIES: {
            const selectedRepoIds = action.payload.map( repo => repo.id);
            return [ ...state.filter( repo => !selectedRepoIds.includes(repo.id))]
        }
        case SELECT_REPOSITORIES: {
            const {ids, value} = action.payload;
            return [ ...state.map( repo => {
                repo.isChecked = ids.includes(repo.id) ? value : repo.isChecked;
                return repo
            })]
        }
        case GET_STATUSES_DONE:
            return [ ...state.map( repo => {
                const updatedRepo = action.payload.find( item => item.id === repo.id);
                return updatedRepo ? updatedRepo : repo;
            })]
        default:
            return state;
    }
};

export default repositoriesListReducer;