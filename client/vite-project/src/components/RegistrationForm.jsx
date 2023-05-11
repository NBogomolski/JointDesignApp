import "../styles/Login.sass";
import { Link } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {


    const registerUser = (e) => {
        e.preventDefault();
        const password = e.currentTarget.password
        const passwordConfirmation = e.currentTarget.confirmation
        const username = e.currentTarget.username
        if (password.value !== passwordConfirmation.value) {

            return
        }
        axios.post('http://localhost:5000/auth/register', {
            
        }).then(res => {
            username.value = ''
            password.value = ''
            passwordConfirmation.value = ''
        })

    };

    return (
        <div className="centered-container outter-container">
            <h1 className="app-title">Collaborative drawing app</h1>
            <form onSubmit={(e) => registerUser(e)} className="centered-container">
                <h1>Sign Up</h1>
                <input required placeholder="Username" type="text" id="username" />
                <input required placeholder="Password" type="password" id="password" />
                <input required placeholder="Confirm password" type="password" id="confirmation" />
                <input type="submit" value="Register" />
            </form>
            <Link to="/auth/login" replace>
                Log in
            </Link>
        </div>
    );
};

export default RegistrationForm;
