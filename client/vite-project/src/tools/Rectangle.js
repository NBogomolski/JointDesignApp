import Tool from "./Tool";

export default class Rectangle extends Tool {
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
            let height = currentY - this.startY;
            let width = currentX - this.startX;
            if (e.shiftKey) {
                let longerSide = Math.abs(height) > Math.abs(width) ? Math.abs(height) : Math.abs(width)
                height = height > 0 ? longerSide : -longerSide;
                width = width > 0 ? longerSide : -longerSide;
            }
            this.draw(this.startX, this.startY, width, height);
        }
    }

    draw(x, y, w, h) {
        const img = new Image()
        img.src = this.drawn
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.strokeRect(x,y,w,h)
            // this.ctx.fill()
        }
        console.log( x,y,w, h)
    }
}
