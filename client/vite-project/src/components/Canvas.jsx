import { useEffect, useRef } from "react";
import "../styles/App.sass";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState"

const Canvas = observer(() => {
    const canvasRef = useRef();

    useEffect(() => {
        canvasState.setCanvas()
    }, [])

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={600} height={600}></canvas>
        </div>
    );
});

export default Canvas;
