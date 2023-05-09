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
} from "@fortawesome/free-solid-svg-icons";
// import {observer} from 'mobx-react-lite'


const Toolbar = () => {
    // const toolRef = useRef()

    return (
        <aside className="toolbar">
            <h2>Toolbar</h2>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faBrush} size="2xl" />
            </button>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faCircle} size="2xl" />
            </button>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faSquareFull} size="2xl" />
            </button>
            <button className="toolbar-btn">
                <FontAwesomeIcon className='icon-size' icon={faEraser} size="2xl" />
            </button>
            {/* <input type="color" className="toolbar-btn">
                
            </input> */}
            <div>
                <label htmlFor="color-picker" style={{display: 'flex', alignItems: 'center'}} className='toolbar-btn'>
                    <FontAwesomeIcon className='icon-size color-picker' icon={faPalette} />
                </label>
                <input
                    type="color"
                    id="color-picker"
                    className='toolbar-btn'
                    style={{display: 'none'}}
                />
            </div>
        </aside>
    );
}

export default Toolbar