import { useEffect, useRef, useState } from "react";
import "../styles/App.sass";
import { observer } from "mobx-react-lite";
import { Modal, Button, Form} from "react-bootstrap";
import { useParams} from "react-router-dom";
import canvasState from "../store/canvasState"
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rectangle from "../tools/Rectangle";
import axios from 'axios'
import Cookies from "js-cookie";
    

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    // const [showModal, setShowModal] = useState(true)
    const params = useParams();

    useEffect(() => {
        console.log(params.id)
        canvasState.setCanvas(canvasRef.current)
        const ctx = canvasRef.current.getContext("2d");
        axios.get('http://localhost:5000/image?id='+params.id, {
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
            .then(res => {
                const img = new Image();
                img.src = res.data
                img.onload = () => {
                    ctx.clearRect(
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height
                    );
                    ctx.drawImage(
                        img,
                        0,
                        0,
                        canvasRef.current.width,
                        canvasRef.current.height
                    );
                };
            })
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/");
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            console.log(socket)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id));
            socket.onopen = () => {
                console.log('connection established')
                socket.send(
                    JSON.stringify({
                        sessionId: params.id,
                        username: canvasState.username,
                        event: "connection",
                    })
                );
            };
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.event) {
                    case 'connection':
                        console.log(`${msg.username} connected`)
                        break
                    case 'draw':
                        handleDrawing(msg)
                        break
                }
            };
            // return () => {

            // };
        }
    }, [canvasState.username])


    const handleDrawing = (msg) => {
        const shape = msg.shape
        console.log(msg)
        const ctx = canvasRef.current.getContext('2d')
        switch (shape.type) {
            case 'brush':
                Brush.draw(ctx, shape.x, shape.y)
                break
            case 'rectangle':
                Rectangle.staticDraw(ctx, shape.x, shape.y, shape.width, shape.height, shape.fillColor)
                break
            case 'finish':
                ctx.beginPath()
                break
        }
    }

    function saveAction() { 
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post('http://localhost:5000/image?id='+params.id, {
            img: canvasRef.current.toDataURL()
        }).then((res) => {
            console.log(res.data)
        })
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setShowModal(false)
    }

    return (
        <div className="canvas">
            {/* <Modal show={showModal} onHide={() => {}}>
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
            </Modal> */}
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
