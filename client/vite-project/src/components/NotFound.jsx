import '../styles/NotFound.sass'
import { useNavigate } from 'react-router-dom'
import AuthState from '../store/authState'
import { useEffect } from 'react'

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log(AuthState.loggedIn)
        navigate('/auth/login', {replace: true})
    }, [])

    return (
        <div className="container">
            <h1>404 Not Found</h1>
            <h2>The page you are looking for does not exist.</h2>
        </div>
        
    )
    

}

export default NotFound