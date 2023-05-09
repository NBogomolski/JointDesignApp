import Tool from "./Tool";

export default class Ellipse extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop
        this.drawn = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let radiusY = currentY - this.startY;
            let radiusX = currentX - this.startX;
            if (e.shiftKey) {
                let longerSide = Math.abs(radiusY) > Math.abs(radiusX) ? Math.abs(radiusY) : Math.abs(radiusX)
                radiusY = longerSide
                radiusX = longerSide
            }
            this.draw(this.startX, this.startY, Math.abs(radiusX), Math.abs(radiusY));
        }
    }

    draw(x, y, xRadius, yRadius) {
        const img = new Image()
        img.src = this.drawn
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.ellipse(x,y,xRadius,yRadius, 0, 0, 2*Math.PI)
            this.ctx.stroke()
            // this.ctx.fill()
        }
        // console.log( x,y,w, h)
    }
}
