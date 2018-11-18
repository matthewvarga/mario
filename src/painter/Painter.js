import Map from "../map/Map";
class Painter {

    constructor(){
        // stores the canvas context
        this._context = null;
        this._canvas = null;
    }

    /**
     * Sets the canvas context that will be painted on.
     * @param {Context} context - the 2d context of the canvas.
     */
    setContext(context) {
        this._context = context;
    }

    /**
     * returns the canvas context.
     */
    getcontext() {
        return this._context;
    }

    /**
     * Sets the canvas that will be painted on.
     * @param {Canvas} canvas - the canvas
     */
    setCanvas(canvas) {
        this._canvas = canvas;
    }

    /**
     * returns the canvas.
     */
    getCanvas() {
        return this._canvas;
    }

    clear() {
        let canvas = this.getCanvas();
        let context = this.getcontext();
        console.log("clearing");
        console.log("width: " + canvas.width);
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawTest() {
        this.clear();
        let layer = Map.getLayer("background");
        let visibleTiles = layer.getSurroundingTiles(4, 4, 4, 3);

        console.log("visibleTiles");
        console.log(visibleTiles);
        let context = this.getcontext();
        for(let y = 0; y < visibleTiles.length; y++) {
            for(let x = 0; x < visibleTiles[y].length; x++) {
                // draw tile outline
                context.beginPath();
                context.rect(x*48, y*48, 48, 48);
                context.stroke();
                context.closePath();

                // write tile number inside of it
                context.beginPath();
                context.font = "12px Arial";
                context.fillText(visibleTiles[y][x].tileInfo, x*48 + 15, y*48 + 30);
                context.closePath();
            }
        }
    }

    drawLayerVisibleSection(layerName, visibleStartingCol, visibleStartingRow, leftOffset, topOffset) {
        let numVisibleRows = Map.getNumVisibleRows();
        let numVisibleCols = Map.getNumVisibleCols();

        let layer = Map.getLayer(layerName);

        let tileWidth = layer.getTileWidth();
        let tileHeight = layer.getTileHeight();

        let numRows = layer.getNumRows();
        let numCols = layer.getNumCols();

        let context = this.getcontext();

        console.log("painter");
        console.log(context);

        // clear the canvas
        this.clear();

        for(let x = 0; x < numVisibleRows; x++) {
            for(let y = 0; y < numVisibleCols; y++) {
                let tile = layer.getTile(visibleStartingCol+x, visibleStartingRow+y);

                // draw tile outline
                context.beginPath();
                context.rect(x*tileWidth+leftOffset, y*tileHeight+topOffset, tileWidth, tileHeight);
                context.stroke();
                context.closePath();

                // write tile number inside of it
                context.beginPath();
                context.font = "12px Arial";
                context.fillText(tile.tileInfo, x*tileWidth + 15 + leftOffset, y*tileHeight + 30 + topOffset);
                context.closePath();
            }
        }

    }
   
}

export default new Painter();