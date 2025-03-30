import spinner from '../assets/spinner.gif';

function Spinner() {
    return (
        <img
            className='text-center mx-auto'
            src={spinner}
            alt='Loading...'
            width={80}
        />
    )
}

export default Spinner;