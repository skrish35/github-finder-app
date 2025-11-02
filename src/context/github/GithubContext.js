import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const setLoading = (isLoading) => {
        dispatch({ type: 'SET_LOADING', value: isLoading })
    }

    // Search users by username.
    const searchUsers = async (username) => {
        const params = new URLSearchParams({
            q: username
        });
        await setLoading(true);
        try {
            const response = await fetch(`https://api.github.com/search/users?${params}`);
            const { items } = await response.json();
            dispatch({ type: 'SET_USERS', payload: items });
        } catch(error) {
            console.log(error);
        } finally {
            await setLoading(false);
        }
    }

    // Clear users from state.
    const clearUsers = () => {
        dispatch({ type: 'SET_USERS', payload: [] });
    }

    return <GithubContext.Provider value={{
        loading: state.loading,
        users: state.users,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;