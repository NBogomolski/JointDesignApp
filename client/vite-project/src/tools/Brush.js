import Tool from "./Tool"

export default class Brush extends Tool {
    constructor(canvas, socket, session) {
        console.log('Brush ',socket)
        super(canvas, socket, session)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(
            JSON.stringify({
                event: "draw",
                sessionId: this.session,
                shape: {
                    type: "finish",
                },
            })
        );
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(
            e.pageX - e.target.offsetLeft,
            e.pageY - e.target.offsetTop
        )
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(
            //     e.pageX - e.target.offsetLeft,
            //     e.pageY - e.target.offsetTop
            // )
            this.socket.send(
                JSON.stringify({
                    event: "draw",
                    sessionId: this.session,
                    shape: {
                        type: "brush",
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                    },
                })
            );
        }
    }

    static draw(ctx, x, y) {
        ctx.lineTo(x, y)
        ctx.stroke()
        // console.log('brush', 'fill stroke:', this.ctx.fillStyle, this.ctx.strokeStyle)
    }

}
