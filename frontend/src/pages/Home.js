import { useEffect} from "react"
import { useTicketContext } from "../hooks/useTicketContext"
//need the above to access the global context state 
//components
import { useAuthContext } from "../hooks/useAuthContext"
import TicketDetails from "../components/TicketDetails"
import TicketForm from "../components/TicketForm"

    const Home = () => {

        //creating the state
        //so we can update it
        

        //destructuring things from the context it provides
        const {bugticket, dispatch} = useTicketContext()
        const { user } = useAuthContext()

        useEffect(() => {
            const fetchTickets = async () => {
                const response = await fetch('/api/bugtrack/', {
                    headers: {
                        'Authorization' : `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                //now we should have an array of objects
                if(response.ok){
                    dispatch({type: 'SET_BugTicket', payload: json})
                 
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
