import {useState } from "react";
import "./styles/App.sass";
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas";

function App() {
    return (
        <>
            <div className="app">
				<div className="room">
					<Toolbar/>
					<div className="canvas-container">
						<div className="setting-bar">
							<h2>Setting bar</h2>
						</div>
						<Canvas/>
					</div>
				</div>
			</div>
        </>
    );
}

export default App;
