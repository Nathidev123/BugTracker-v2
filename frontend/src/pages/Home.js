import { useEffect} from "react"
import { useTicketContext } from "../hooks/useTicketContext"
//need the above to access the global context state 
//components
import TicketDetails from "../components/TicketDetails"
import TicketForm from "../components/TicketForm"

    const Home = () => {

        //creating the state
        //so we can update it
        //const [tickets, setTickets] = useState(null)
        //after useTicketContext no longer need line above

        //destructuring things from the context it provides
        const {bugticket, dispatch} = useTicketContext()

        useEffect(() => {
            const fetchTickets = async () => {
                const response = await fetch('/api/bugtrack/')
                const json = await response.json()
                //now we should have an array of objects
                if(response.ok){
                    //setTickets(json) no longer need as well

                    // The backend controller uses Ticket.find({}) to fetch all tickets.
                    // MongoDB returns an array of documents.
                    // We send that array back as JSON.
                    // So here, json = [ticketObj1, ticketObj2, ...]
                    // Each object is one ticket with its fields.
                    // tickets state now holds that array of ticket objects.
                    //so in essence useEffect fires the function when component
                    //first renders, then we have, after its ran
                    // is the tickets

                    //after adding useTicketContext
                    //to update we use dispatch now
                    dispatch({type: 'SET_BugTicket', payload: json}) //the json will be the 
                    //full array
                    //so now we finally have the actual data from db
                    //as this home.js talks to db
                    //so basically: after fetching data and respnse is ok and we have data
                    //do the above
                    //that then fires the ticketReducer function in ticketContext
                    //and passes in the action which is the dispatch right here
                }
            }
            fetchTickets()
        }, [dispatch])

        return(
            <div className="home">
                <div className="tickets">
                {/*to cycle through the tickets below
                and only if we have a value for tickets
                we can map through*/}
                {bugticket && bugticket.map((ticket) => (

                <TicketDetails key={ticket._id} ticket={
                    ticket
                }></TicketDetails>
                    
                ))}
                </div>
                <TicketForm/>
            </div>
        )
    }

    export default Home
    /*                    {/*getting access to each individual
                        ticket*/
    /*Think of it like a delivery system:

The parent (Home.jsx) is the warehouse with all the tickets.

The child (TicketDetails.jsx) is the shop window.

The prop (ticket={ticket}) is the delivery truck that carries one ticket from the warehouse to the shop window.

Without the truck (prop), the shop window would be empty.*/