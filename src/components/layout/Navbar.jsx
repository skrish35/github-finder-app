import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar({ title='Github Finder' }) {
    return (
        <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
            <div className='container mx-auto'>
                <div className='flex-none px-2 mx-2'>
                    <FaGithub className='inline pr-2 text-5xl' />
                    <Link to='/' className='text-lg font-bold align-middle'>{title}</Link>
                </div>
            </div>

            <div className='flex-1 px-2 mx-2'>
                <div className='flex justify-end'>
                    <Link to='/' className='btn btn-lg btn-ghost rounded-btn'>
                        Home
                    </Link>
                    <Link to='/about' className='btn btn-lg btn-ghost rounded-btn'>
                        About
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;