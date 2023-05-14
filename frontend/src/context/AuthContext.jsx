import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "../reducer/AuthReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AuthReducer, {
        user: null
    })

    useEffect(() => {
        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}