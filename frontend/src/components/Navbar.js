import { Link } from "react-router-dom"
import { useTicketContext } from "../hooks/useTicketContext"
import { useState } from "react"

const Navbar = () => {
    const { dispatch } = useTicketContext()

    const [mode, setMode] = useState('priority')

    const handleFilter = () => {
        const next = mode === 'priority' ? 'status' : mode ===  'status' ? 'date' : 'priority'
        setMode(next)
        dispatch({type: 'SORT_BugTicket', payload: next})

    }
    return(
        <header>
            <div className="container">
            <Link to={"/"}>
            {/* this is us linking
            to the home page which is / */}
            <h1>Tickets Board</h1>
            
            </Link>
            <span className="material-symbols-outlined" onClick={handleFilter}>
                sort
                </span>
            </div>
        </header>
    )
}

export default Navbar