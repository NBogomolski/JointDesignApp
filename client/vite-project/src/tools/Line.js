import Tool from "./Tool";

export default class Line extends Tool {
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
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.drawn = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currX = e.pageX - e.target.offsetLeft;
            let currY = e.pageY - e.target.offsetTop; 
            if (e.shiftKey) {
                let triangleSideX = Math.abs(currX - this.currentX);
                let triangleSideY = Math.abs(currY - this.currentY);
                let largerSide = triangleSideX > triangleSideY ? triangleSideX : triangleSideY;
                let correctX = currX < this.currentX ? this.currentX - largerSide : this.currentX + largerSide
                let correctY = currY < this.currentY ? this.currentY - largerSide : this.currentY + largerSide
                this.draw(correctX, correctY)
            } else {
                this.draw(
                    currX,
                    currY,
                );
            }
        }
    }

    draw(endX, endY) {
        const img = new Image();
        img.src = this.drawn;
        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();

        };
        console.log(this.currentX, this.currentY, endX, endY);
    }
}
