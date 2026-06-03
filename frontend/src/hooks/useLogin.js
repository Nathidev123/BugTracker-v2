
import { useState } from 'react'

import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    //will be true when starting request

    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        //setting to null whenever a new request is sent
        //if there was error from prev request

        const response = await fetch('api/user/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email, password})
            //contents of the request above
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            //storing JSON web token in localStorage
            dispatch({type: 'LOGIN', payload: json})
            //updating auth context
            setIsLoading(false)
        }
    }
    return {login, isLoading, error}
    //returning the functions of this hook
    //so we can grab it from inside signup component

}