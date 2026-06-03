import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useTicketContext } from "../hooks/useTicketContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { dispatch } = useTicketContext()

    const [mode, setMode] = useState('priority')

    const handleClick = () => {
        logout()
        //to delete user item from local storgae
        //and update global state to null again
    }

    const handleFilter = () => {
        const next = mode === 'priority' ? 'status' : mode ===  'status' ? 'date' : 'priority'
        setMode(next)
        dispatch({type: 'SORT_BugTicket', payload: next})

    
    }
    return(
        <header>
            <div className="container">
            <Link to={"/"}>
            {/* this is linking
            to the home page which is / */}
            <h1>Tickets Board</h1>
            
            </Link>
            <div>
                {user && (
                    <div>
                        <span className="email">{user.email}</span>
                        <button onClick={handleClick} className="logout">Log Out</button>
                    </div>
                )}
                {!user && (
                     <div className="loginsignup">
                <Link to="/login ">Login</Link>  
                <Link to="/signup">Signup</Link> 
                     </div>
                    )
                }   
                </div>
            <span className="material-symbols-outlined" onClick={handleFilter}>
                sort
                </span>

            </div>
        </header>
    )
}

export default Navbar