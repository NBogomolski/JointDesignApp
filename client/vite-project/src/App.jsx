import React, {useState } from "react";
import "./styles/App.sass";
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/:id/*"
                    element={
                        <div className="app">
                            <div className="room">
                                <Toolbar />
                                <div className="canvas-container">
                                    <SettingBar />
                                    <Canvas />
                                </div>
                            </div>
                        </div>
                    }
                />
                <Route
                    path="/*"
                    element={<Navigate to={`f${(+new Date()).toString(16)}`} />}
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
