import {useState } from "react";
import "./styles/App.sass";

function App() {
    return (
        <>
            <fragment className="app">
				<div className="room">
					<aside className="toolbar">
						<h2>Toolbar</h2>
						<div>
							<p>item 1</p>
							<p>item 2</p>
						</div>
					</aside>
					<div className="canvas-container">
						<div className="setting-bar">
							<h2>Setting bar</h2>
						</div>
						<div className="canvas">
							<canvas /* width={600} height={600} */></canvas>
						</div>
					</div>
				</div>
			</fragment>
        </>
    );
}

export default App;
