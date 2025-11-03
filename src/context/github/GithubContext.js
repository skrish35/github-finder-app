import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
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

    // Get single user profile data.
    const getUser = async (login) => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${login}`);
                const data = await response.json();
                dispatch({ type: 'SET_USER', payload: data });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
    }

    const getUserRepos = async (login) => {
        setLoading(true);
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        });

        try {
            const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`);
            const data = await response.json();
            dispatch({ type: 'SET_REPOS', payload: data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return <GithubContext.Provider value={{
        loading: state.loading,
        users: state.users,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;