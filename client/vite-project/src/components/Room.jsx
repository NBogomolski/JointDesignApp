import '../styles/App.sass';
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";
import Canvas from "./Canvas";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Room = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate("/auth/login");
        }
        
    }, [])


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