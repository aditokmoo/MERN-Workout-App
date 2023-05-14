import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if(!response.ok) {
            setIsLoading(false)
            setError(data.error)
        }

        if(response.ok) {
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(data))
            // Update auth context
            dispatch({ type: 'LOGIN', payload: data })
            // Disable loading
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}