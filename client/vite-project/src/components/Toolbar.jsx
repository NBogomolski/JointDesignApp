import { useRef } from 'react'
import '../styles/App.sass'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle, faSquare} from "@fortawesome/free-regular-svg-icons";
import {
    faBrush,
    faEraser,
    faCircle,
    faSquareFull,
    faLeftLong,
    faRightLong,
    faFloppyDisk,
    faGripLinesVertical,
} from "@fortawesome/free-solid-svg-icons";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rectangle from '../tools/Rectangle';
import Ellipse from '../tools/Ellipse';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';


const Toolbar = () => {
    // const toolRef = useRef()
    const exportImage = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionId + '.jpg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <aside className="toolbar">
            <h2>Toolbar</h2>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <FontAwesomeIcon className='icon-size' icon={faBrush} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Ellipse(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faCircle} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Rectangle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <FontAwesomeIcon className='icon-size' icon={faSquareFull} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faEraser} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Line(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faGripLinesVertical} />
            </button>
            

            <button className="toolbar-btn" onClick={() => canvasState.undo()} style={{marginTop: 'auto'}}>
                <FontAwesomeIcon className='icon-size' icon={faLeftLong} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => canvasState.redo()}>
                <FontAwesomeIcon className='icon-size' icon={faRightLong} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => exportImage()}>
                <FontAwesomeIcon className='icon-size' icon={faFloppyDisk} size="2xl" />
            </button>
        </aside>
    );
}

export default Toolbar