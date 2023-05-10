import { useEffect, useRef, useState } from "react";
import "../styles/App.sass";
import { observer } from "mobx-react-lite";
import { Modal, Button, Form} from "react-bootstrap";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState"
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [showModal, setShowModal] = useState(true)
    const params = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    useEffect(() => {

        if (canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/");
            socket.onopen = () => {
                console.log('connection established')
                socket.send(
                    JSON.stringify({
                        id: params.id,
                        username: canvasState.username,
                        method: "connection",
                    })
                );
            };
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                console.log(msg);
            };
            // return () => {

            // };
        }
    }, [canvasState.username])


    function saveAction() { 
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setShowModal(false)
    }

    return (
        <div className="canvas">
            <Modal show={showModal} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Enter username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control ref={usernameRef} type="text" placeholder="Username" />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => connectionHandler()}
                    >
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                onMouseDown={() => saveAction()}
                ref={canvasRef}
                width={600}
                height={600}
            ></canvas>
        </div>
    );
});

export default Canvas;
