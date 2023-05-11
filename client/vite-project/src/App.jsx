import React, {useState } from "react";
import "./styles/App.sass";
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar";
import Room from "./components/Room";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from "./components/NotFound";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/auth/login" element={<LoginForm />} />
                <Route path="/auth/register" element={<RegistrationForm />} />
                <Route
                    path="/rooms/:id/*"
                    element={<Room />}
                />
                <Route
                    path="/*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
        // <BrowserRouter>
        //     <div className="app">
        //         <Routes>
        //             <Route path="/:id/*">
        //                 <div className="room">
        //                     <Toolbar />
        //                     <div className="canvas-container">
        //                         <SettingBar />
        //                         <Canvas />
        //                     </div>
        //                 </div>
        //             </Route>
        //             <Route path="/*">
        //                 <Navigate to={`f${(+new Date()).toString(16)}`} />
        //             </Route>
        //         </Routes>
        //     </div>
        // </BrowserRouter>
    );
}

export default App;
