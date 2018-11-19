import Map from "../map/Map";
import Player from "../player/Player";

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

    /**
     * clears the canvas.
     */
    clear() {
        let canvas = this.getCanvas();
        let context = this.getcontext();
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Takes the (x,y) coordinates of a tile, and the number of rows / columns to be drawn, 
     * then centers the tile as closely as possible, and drawns the surrounding.
     * 
     * @param {*} layerName - layer that will be drawn
     * @param {*} tileXCoord - x coordinate of tile being centered / surrounded
     * @param {*} tileYCoord - y coordinate of tile being centered / surrounded
     * @param {*} numCols - number of columns being drawn
     * @param {*} numRows - number of rows being drawn
     * @param {*} offsetLeft - left offset in which the surrounding is being drawn
     * @param {*} offsetTop - top offset in which the surrounding is being drawn
     */
    drawSurroundingTiles(layerName, tileXCoord, tileYCoord, numCols, numRows, offsetLeft, offsetTop) {
        let context = this.getcontext();
        let layer = Map.getLayer(layerName);
        let w = layer.getTileWidth();
        let h = layer.getTileHeight();
        try {

            let surroundingtiles = layer.getSurroundingTiles(tileXCoord, tileYCoord, numCols, numRows);

            this.clear();

            for(let y = 0; y < surroundingtiles.length; y++) {
                for(let x = 0; x < surroundingtiles[y].length; x++) {

                    // if drawing center tile
                    let tile = surroundingtiles[y][x];

                    if(tile.tileInfo == tileXCoord + "," + tileYCoord) {
                        console.log("x: " + x);
                        console.log("y: " + y);

                        context.beginPath()
                        context.fillStyle="red";
                        context.fillRect(x*w+offsetLeft, y*h+offsetTop, w, h);
                        context.closePath();
                    }
                    else {
                        // draw tile outline
                        context.beginPath();
                        context.fillStyle="#000000";
                        context.rect(x*w+offsetLeft, y*h+offsetTop, w, h);
                        context.stroke();
                        context.closePath();
                    }

                    // write tile number inside of it
                    context.beginPath();
                    context.fillStyle="#000000";
                    context.font = "12px Arial";
                    context.fillText(surroundingtiles[y][x].tileInfo, x*48 + 15 + offsetLeft, y*48 + 30 + offsetTop);
                    context.closePath();
                }
            }
        }
        catch(InvalidColumnException) {
            console.log("invalid column exception :(");
        }
    }

    drawPlayer() {
        let playerCol = Player.getLeftCol();
        console.log("player col: " + playerCol);
        this.drawSurroundingTiles("background", playerCol, playerCol, 5, 5, Player.getOffset(), 0);
    }
}

export default new Painter();