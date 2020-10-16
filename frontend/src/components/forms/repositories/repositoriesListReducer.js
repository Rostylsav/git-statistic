const initState = [{
    id: '123',
    name: 'repo1',
    isExist: true
}, {
    id: '321',
    name: 'repo2',
    isExist: false
}];
const repositoriesListReducer =  (state = initState, action) => {
    switch (action.type) {
        case "ADD_REPO_NAME":
            return {
                ...state,
                reposName: [...state.reposName, action.payload.repoName]
            };
        default:
            return state;
    }
};

export default repositoriesListReducer;