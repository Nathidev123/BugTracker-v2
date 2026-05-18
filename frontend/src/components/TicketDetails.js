import { useTicketContext } from "../hooks/useTicketContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const TicketDetails = ({ticket}) => {
    //using the props from home.js
    //remember props are used to pass data down

    const { dispatch } = useTicketContext()

    const handleClick = async () => {
        const response = await fetch('/api/bugtrack/' + ticket._id, {
            method: 'DELETE'
             //so here backend will try and delete from db
        })
        const json = await response.json()
        //so if delete was success in backend only then 
        //can we delete from our global context  or
        //frontend if youd like
        if(response.ok){
            dispatch({type: 'DELETE_BugTicket', payload: json})
            //after this handle in ticketcontext
        }
    }
    const handleUpdate = async () => {
        const newStatus = ticket.status === 'Closed' ? 'In Progress' : 
                            ticket.status === 'In Progress' ? 'Open' : 'Closed'

        const response =  await fetch('api/bugtrack/' + ticket._id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                status: newStatus
            })
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: 'UPDATE_BugTicket', payload: json})
        }
    }
    return(
        <div className="ticket-details">
            <h4><strong>Priority: </strong>
            <span style={{ color: ticket.priority === 'High'
                ? 'red' : ticket.priority === 'Medium' ? 'hsl(210, 100%, 80%)' : 'green'
            }}>{ticket.priority}</span></h4>

            <h3><strong>Status: </strong>{ticket.status}</h3>
            <h4>{ticket.title}</h4>
            <p><strong>Description: </strong>{ticket.description}</p>
            
            <p>Created {formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true})}</p>
            {ticket.updatedAt && (
            <p>Updated {formatDistanceToNow(new Date(ticket.updatedAt), {addSuffix: true})}</p>
            )} 
            <span className="material-symbols-outlined delete-icon" onClick={handleClick}>
  delete
</span>     
            <span onClick={handleUpdate} className="material-symbols-outlined">
            edit
            </span>
        </div>
    )
}

export default TicketDetails