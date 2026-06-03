
import { TicketContext } from "../context/ticketContext";

import { useContext } from "react";


export const useTicketContext = () => {

    const context = useContext(TicketContext)

    if(!context){
        throw Error('useTicketContext must be used inside a TicketContextProvider')
    }

    return context
    //when want ticket data, going to invoke this useTicketContext hook and get context
    //value back
    
}