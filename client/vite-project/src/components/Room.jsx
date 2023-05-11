import '../styles/App.sass';
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";
import authState from '../store/authState';
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const navigate = useNavigate()

    if (!authState.loggedIn) {
        navigate("/auth/login");
    }

    return (
        <div className="app">
            <div className="room">
                <Toolbar />
                <div className="canvas-container">
                    <SettingBar />
                    <Canvas />
                </div>
            </div>
        </div>
    )
};

export default Room