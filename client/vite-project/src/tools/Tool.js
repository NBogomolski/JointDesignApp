export default class Tool {
    constructor(canvas, socket, session) {
        this.canvas = canvas;
        this.socket = socket;
        console.log('Tool ',socket, this.socket)
        this.session = session;
        this.ctx = canvas.getContext("2d");
        this.destroyEvents()
    }

    set fillColor(color) {
        if (color) this.ctx.fillStyle = color;
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color;
        console.log(this.ctx.strokeStyle)
    }

    set lineThickness(thickness) {
        this.ctx.lineWidth = thickness;
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}