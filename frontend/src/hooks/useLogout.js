
import { useAuthContext } from "./useAuthContext";
import { useTicketContext } from "./useTicketContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: ticketsDispatch } = useTicketContext()
    const logout = () => {
    //removing user from local storage
    localStorage.removeItem('user')

    //dispatching logout action
    dispatch({type: 'LOGOUT'})

    ticketsDispatch({type: 'SET_BugTicket', payload: null})
    }

    return {logout}
}
    