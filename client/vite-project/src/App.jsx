import {useState } from "react";
import "./styles/App.sass";
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import SettingBar from "./components/SettingBar";

function App() {
    return (
        <>
            <div className="app">
				<div className="room">
					<Toolbar/>
					<div className="canvas-container">
						<SettingBar/>
						<Canvas/>
					</div>
				</div>
			</div>
        </>
    );
}

export default App;
