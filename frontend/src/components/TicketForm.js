import { useState } from "react"
import { useTicketContext } from "../hooks/useTicketContext"
import { useAuthContext } from "../hooks/useAuthContext"
const TicketForm = () => {

    const { dispatch } = useTicketContext()
    const { user } = useAuthContext()


    const [priority, setPriority] = useState('')
           const [status, setStatus] = useState('')
           const [title, setTitle] = useState('')
           const [description, setDescription] = useState('')
           const [error, setError] = useState(null)
           const [emptyFields, setEmptyFields] = useState([])

           const handleSubmit = async (e) => {
               e.preventDefault()
            if(!user){
                setError('You must be logged in')
                return
            }
           const bugticket = {title, description, priority, status}
   
           const response =  await fetch('/api/bugtrack/', {
               method: 'POST',
               body: JSON.stringify(bugticket),
               headers: {
                   'Content-Type' : 'application/json',
                   'Authorization' : `Bearer ${user.token}`
               }
           })
           const json = await response.json()
           
           //checking response
           if(!response.ok){
               setError(json.error)
               setEmptyFields(json.emptyFields)
           }
           if(response.ok){
             setPriority('')
             setStatus('')
             setTitle('')
             setDescription('')
             setError(null)
             setEmptyFields([])
             //console.log('', json)
             //want to dispatch action only once its successfully
             //added to the db
             dispatch({type:'CREATE_BugTicket', payload: json})
           }
           
       }
       return(
           <form className="create" onSubmit={handleSubmit}>
               <h3>Create a Ticket</h3>

               <label>Priority: </label>
                <select className="selectClass" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value={"High"}>High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                className={emptyFields.includes('priority') ? 'error' : ''}
                </select>

               <label>Status: </label>
                <select className="selectClass" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Open">Open</option>
                <option value="In progress">In progress</option>
                <option value="Closed">Closed</option>
                className={emptyFields.includes('status') ? 'error' : ''}
                </select>

               <label>Title: </label>
               <input type="text" onChange={(e) => setTitle(e.target.value)}
               value={title}
               className={emptyFields.includes('title') ? 'error' : ''}/>
   
               <label>Description: </label>
               <input type="text" onChange={(e) => setDescription(e.target.value)}
               value={description}
               className={emptyFields.includes('description') ? 'error' : ''}/>
   
               <button>Create Ticket</button>
               {error && <div className="error">{error}</div>}
           </form>
   
       )


}

export default TicketForm 
/*<input type="text" onChange={(e) => setStatus(e.target.value)}
               value={status}
               className={emptyFields.includes('status') ? 'error' : ''}/>*/