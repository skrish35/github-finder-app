import { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

function Alert() {
    const { alert } = useContext(AlertContext);

    return (
        alert !== null && (
            <p className='flex flex-start mb-4 space-x-2'>
                {alert.type === 'error' && (
                    <p className='flex-1 text-base font-bold leading-7 text-red-700'>
                        {alert.message}
                    </p>
                )}
            </p>
        )
    )
}

export default Alert;