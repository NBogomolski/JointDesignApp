import {useState } from "react";
import "./styles/App.sass";

function App() {
    return (
        <>
			<h1>Collaborative design</h1>
            <fragment className="app room">
				<div className="toolbar">

				</div>
				<div className="canvas">

				</div>
			</fragment>
        </>
    );
}

export default App;
