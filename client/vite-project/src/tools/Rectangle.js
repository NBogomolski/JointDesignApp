import Tool from "./Tool";

export default class Rectangle extends Tool {
    constructor(canvas, socket, sessionId) {
        super(canvas, socket, sessionId);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(
            JSON.stringify({
                event: "draw",
                sessionId: this.session,
                shape: {
                    type: "rectangle",
                    x: this.startX,
                    y: this.startY,
                    width: this.width,
                    height: this.height,
                    fillColor: this.ctx.fillStyle
                },
            })
        );
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.drawn = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.height = currentY - this.startY;
            this.width = currentX - this.startX;
            if (e.shiftKey) {
                let longerSide =
                    Math.abs(this.height) > Math.abs(this.width)
                        ? Math.abs(this.height)
                        : Math.abs(this.width);
                this.height = this.height > 0 ? longerSide : -longerSide;
                this.width = this.width > 0 ? longerSide : -longerSide;
            }
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x, y, w, h) {
        const img = new Image();
        img.src = this.drawn;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx.strokeRect(x, y, w, h);
            // if (this.ctx.fillStyle)
            this.ctx.fillRect(x, y, w, h);
            // this.ctx.fill()
        };
        // console.log( x,y,w, h)
    }

    static staticDraw(ctx, x, y, w, h, fillColor) {
        // ctx.beginPath()
        ctx.fillStyle = fillColor
        ctx.strokeRect(x, y, w, h);
        ctx.fillRect(x, y, w, h);
    }
}
