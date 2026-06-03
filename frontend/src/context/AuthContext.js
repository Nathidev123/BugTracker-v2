
import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT': 
            return { user: null }//when user logs out returns to null
        default:
            return state        
    }
}

//custom component to wrap the entire application
//and provide a value from this context
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
    console.log('AuthContext state: ', state)
    //this line will update whenever state changes

    //wrapping entire application
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}