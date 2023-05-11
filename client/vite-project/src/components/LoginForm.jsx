import '../styles/Login.sass'
import { Link } from 'react-router-dom';


const LoginForm = () => {


    const loginUser = (e) => {
        e.preventDefault();

    }

    return (
        <div className="centered-container outter-container">
            <h1 className="app-title">Collaborative drawing app</h1>
            <form onSubmit={(e) => loginUser(e)} className="centered-container">
                <h1>Log In</h1>
                <input placeholder="Username" type="text" id="username" />
                <input placeholder="Password" type="password" id="password" />
            </form>
            <Link to="/auth/register" replace>
                Register
            </Link>
        </div>
    );
}

export default LoginForm