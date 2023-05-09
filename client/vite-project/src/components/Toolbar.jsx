import { useRef } from 'react'
import '../styles/App.sass'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle, faSquare} from "@fortawesome/free-regular-svg-icons";
import {
    faBrush,
    faEraser,
    faPalette,
    faCircle,
    faSquareFull,
    faLeftLong,
    faRightLong,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rectangle from '../tools/Rectangle';
import Ellipse from '../tools/Ellipse';


const Toolbar = () => {
    // const toolRef = useRef()

    function changeColor(e) {
        // toolState.setStrokeColor(e.target.value);
        // toolState.setFillColor(e.target.value);
    }

    return (
        <aside className="toolbar">
            <h2>Toolbar</h2>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faBrush} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Ellipse(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faCircle} size="2xl" />
            </button>
            <button className="toolbar-btn" onClick={() => toolState.setTool(new Rectangle(canvasState.canvas))}>
                <FontAwesomeIcon className='icon-size' icon={faSquareFull} size="2xl" />
            </button>
            <button className="toolbar-btn" >
                <FontAwesomeIcon className='icon-size' icon={faEraser} size="2xl" />
            </button>
            <div>
                <label htmlFor="color-picker" style={{display: 'flex', alignItems: 'center'}} className='toolbar-btn'>
                    <FontAwesomeIcon className='icon-size color-picker' icon={faPalette} />
                </label>
                <input
                    type="color"
                    id="color-picker"
                    className='toolbar-btn'
                    onChange={e => changeColor(e)}
                    style={{display: 'none'}}
                />
            </div>
            <button className="toolbar-btn" style={{marginTop: 'auto'}}>
                <FontAwesomeIcon className='icon-size' icon={faLeftLong} size="2xl" />
            </button>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faRightLong} size="2xl" />
            </button>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faFloppyDisk} size="2xl" />
            </button>
        </aside>
    );
}

export default Toolbar