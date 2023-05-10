import {makeAutoObservable} from 'mobx'

class ToolState {
    tool = null;
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setFillColor(color) {
        this.tool.fillColor = color;
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color;
    }

    setLineThickness(lineThickness) {
        this.tool.lineThickness = lineThickness;
        console.log(lineThickness);
    }
}

export default new ToolState()