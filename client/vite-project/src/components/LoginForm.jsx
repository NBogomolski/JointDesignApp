import '../styles/Login.sass'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = () => {
    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault();
        const password = e.currentTarget.password;
        const username = e.currentTarget.username;
        axios.post('http://localhost:5000/auth/login', {
            username: username.value,
            password: password.value,
        }).then(response => {
            console.log(response);
            if (response.status == 200) {
                console.log('success')
                if (!response.data.token) {
                    console.log('no token has been found')
                    return
                }
                Cookies.set('token', response.data.token);
                navigate(`/${username.value}`, {replace: true})
            }
        }).catch(err => {
            console.log(err)
            if (err.response) {
                if (err.response.status == 401) {
                    console.log("Invalid credentials");
                }
                if (err.response.status == 404) {
                    console.log("No such user found");
                }
            }
        })
    }

    return (
        <div className="centered-container outter-container">
            <h1 className="app-title">Collaborative drawing app</h1>
            <form onSubmit={(e) => loginUser(e)} className="centered-container">
                <h1>Log In</h1>
                <input placeholder="Username" type="text" id="username" />
                <input placeholder="Password" type="password" id="password" />
                <input type="submit" value="Sign in" />
            </form>
            <Link to="/auth/register" replace>
                New to this? Click to Register
            </Link>
        </div>
    );
}

export default LoginForm