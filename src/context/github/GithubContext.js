import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Search users
    const searchUsers = async (text) => {
        const params = new URLSearchParams({
            q: text
        });

        const response = await fetch(`https://api.github.com/search/users?${params}`);
        const { items } = await response.json();
        dispatch({ type: 'SET_USERS', payload: items });
    };

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' });
    }

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;