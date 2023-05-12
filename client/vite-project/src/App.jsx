import React, {useState } from "react";
import "./styles/App.sass";
import Home from "./components/Home";
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
                <Route path="/:username" element={<Home/>} />
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
    );
}

export default App;
