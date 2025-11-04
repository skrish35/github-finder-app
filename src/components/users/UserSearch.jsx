import { useState, useContext } from 'react';
import { searchUsers } from '../../context/github/GithubActions';
import GithubContext from '../../context/github/GithubContext';
import AlertContext  from '../../context/alert/AlertContext';

function UserSearch() {
    const { users, dispatch } = useContext(GithubContext);
    const { alert, setAlert } = useContext(AlertContext);
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('error', 'Please enter a username');
        } else {
            dispatch({ type: 'SET_LOADING', value: true });
            const users = await searchUsers(text);
            dispatch({ type: 'SET_USERS', payload: users });
            dispatch({ type: 'SET_LOADING', value: false });
        }
    }

    const handleClearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' });
        setText('');
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <div className='relative'>
                            <input
                                type = 'text'
                                className = 'w-full h-14 pr-40 bg-gray-200 input input-lg text-black'
                                placeholder = 'Search...'
                                value={text}
                                onChange={handleTextChange}
                            />
                            <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-ghost h-14 btn-lg bg-green-700'>
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {(users && users.length > 0) && (
                    <button
                        className='btn btn-ghost btn-lg bg-red-700 h-14'
                        onClick={handleClearUsers}
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserSearch;