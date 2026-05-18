
import { createContext, useReducer } from 'react'

export const TicketContext = createContext()

export const ticketReducer = (state, action) => {
    //using switch cases for different actions
    switch(action.type){
        case 'SET_BugTicket':
            return{
                bugticket: action.payload //contains the data we want to store
                //so this component will be exported to component that talks to db
                //but this case is to get all the tickets
            }
        case 'CREATE_BugTicket':
            return{
                bugticket: [action.payload, ...state.bugticket]
                //creating a single new ticket object
                //so the action here is adding a new ticket
                //to the array in [] and we also want the rest
                //of the workout data so ...
            }
        case 'DELETE_BugTicket':
            return{
                bugticket: state.bugticket.filter((b) => b._id !== action.payload._id)
    
    }
        case 'UPDATE_BugTicket':
            return{
                bugticket: state.bugticket.map((b) => 
                b._id === action.payload._id ? action.payload : b)
                //map iterates over existing array
                //for each ticket(b) it checks if the id matches the
                //updated tickets id
                //if it matches, it replaces that ticket with the new
                //action.payload
                //if not it keeps the old ticket unchanged
                //this way we preserve the array while updating
                //only the targeted ticket
            }

        case 'SORT_BugTicket': 
        if(action.payload === 'priority'){
            const order = {High: 3, Medium: 2, Low: 1}

        return{
            ...state,
            bugticket: [...state.bugticket].sort((a, b) => order[b.priority] - order[a.priority])
        }     
        }
        

        if(action.payload === 'status'){
            const order = {Open: 1, 'In Progress': 2, Closed: 3}
            return{
                ...state,
                bugticket: [...state.bugticket].sort((a, b) => order[b.status] - order[a.status])
            }
        }
        return{
            ...state,
            bugticket: [...state.bugticket].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
            
            default:
                return state
    }
}
export const TicketContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ticketReducer, {
        bugticket: []
    })

    return(
        //children prop for the App component
        <TicketContext.Provider value={{...state, dispatch}}>
            {children}
        </TicketContext.Provider>
    )
}