import { useNavigate } from "react-router-dom";
import "../styles/Home.sass";
import { useRef, useEffect } from "react";

const ProjectTile = ({props}) => {
    const canvasRef = useRef()
    const navigate = useNavigate()

    useEffect(() =>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = props.file;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.style.pointerEvents = "none"; // Make the canvas disabled
        };
    },[props])

    const joinRoom = () => {
        navigate('/rooms/:id' + props.sessionId, {replace: true});
    }

    return (
        <div className="tile">
            <div className="room-data">
                <div>
                    <h3 className="name">Room: {props.roomName}</h3>
                    <button onClick={() => joinRoom()}>Join</button>
                </div>
                <div>
                    <input type="text" value={props.sessionId} />
                </div>
            </div>
            <div className="canvas-wrapper">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    )
}

export default ProjectTile
