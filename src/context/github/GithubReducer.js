const githubReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.value
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_REPOS':
            return {
                ...state,
                repos: action.payload
            }
        case 'CLEAR_USERS':
            return {
                ...state,
                users: []
            }
        default:
            return state;
    }
}

export default githubReducer;