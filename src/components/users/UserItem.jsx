import { Link } from 'react-router-dom';

function UserItem({ user }) {
    return (
        <div className='card shadow-md compact side bg-base-100'>
            <div className='flex-row items-center space-x-4 card-body'>
                <div className='avatar'>
                    <div className='rounded-full shadow w-14 h-14'>
                        <img src={user.avatar_url} alt='profile'/>
                    </div>
                </div>
                <div>
                    <h2 className='card-title'>{user.login}</h2>
                    <Link to={`/users/${user.login}`} className='text-base-content text-opacity-40'>
                        Visit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserItem;