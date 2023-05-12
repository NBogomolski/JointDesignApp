import '../styles/NotFound.sass'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie';

const NotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!Cookies.get('token'))
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