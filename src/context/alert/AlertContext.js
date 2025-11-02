import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const initialState = null;

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (type, message) => {
        dispatch({ type: 'SET_ALERT', payload: {type, message }});

        setTimeout(() => {
            dispatch({ type: 'CLEAR_ALERT', payload: null })
        }, 5000)
    }
    return <AlertContext.Provider value={{
        alert: state,
        setAlert
    }}>
        {children}
    </AlertContext.Provider>
}

export default AlertContext;