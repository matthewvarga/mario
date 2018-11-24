import Map from "../map/Map";
import Player from "../player/Player";
import gameVals from "../components/scroller/config.json";

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
     * draws the tiles provided from the origin on the screen
     * @param {*} tiles 
     */
    drawTiles(tiles, horizontalOffset) {
        let context = this.getcontext();
        let w = gameVals.tileWidth;
        let h = gameVals.tileHeight;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameVals.viewWidth / 2;

        this.clear();

        for(let y = 0; y < tiles.length; y++) {
            for(let x = 0; x < tiles[y].length; x++) {

                if(playerVisibleX === centerView) {
                    // draw tile outline
                    context.beginPath();
                    context.fillStyle="#000000";
                    context.rect(x*w + horizontalOffset, y*h, w, h);
                    context.stroke();
                    context.closePath();

                    // write tile number inside of it
                    context.beginPath();
                    context.fillStyle="#000000";
                    context.font = "12px Arial";
                    context.fillText(tiles[y][x].tileInfo, x*48 + 15 +horizontalOffset, y*48 + 30);
                    context.closePath();
                }
                else {
                    // draw tile outline
                    context.beginPath();
                    context.fillStyle="#000000";
                    context.rect(x*w, y*h, w, h);
                    context.stroke();
                    context.closePath();

                    // write tile number inside of it
                    context.beginPath();
                    context.fillStyle="#000000";
                    context.font = "12px Arial";
                    context.fillText(tiles[y][x].tileInfo, x*48 + 15, y*48 + 30);
                    context.closePath();
                }
            }
        }
    }

    drawVisibleTilesAroundPlayer(layerName) {
        let layer = Map.getLayer(layerName);

        let playerVisibleX = Player.getVisibleX();
        let playerGlobalX = Player.getGlobalX();

        let gameMaxWidth = (gameVals.mapWidth-1) * gameVals.tileWidth;
        let centerView = gameVals.viewWidth / 2;

        let playerCol = Math.floor(playerGlobalX/48);

        let section;

        let numBufferCols = gameVals.bufferCols;
        
        // in the center of screen, even number of cols on each side
        if(playerVisibleX === centerView) {
            let startCol = playerCol - 5;
            let endCol = playerCol + 5;

            section = layer.getSection(startCol, endCol, 0, 8);
        }
        // last tiles
        else if(playerGlobalX >= (gameMaxWidth - centerView)) {
            section = layer.getSection(gameVals.mapWidth-10, gameVals.mapWidth, 0, 8);
        }
        // first tiles
        else {
            section = layer.getSection(0, 10, 0, 8);
        }

        this.drawTiles(section, -(playerGlobalX%48));
    }

    drawPlayer() {
        let context = this.getcontext();

        context.beginPath()
        context.fillStyle="red";
        context.fillRect(Player.getVisibleX(), Player.getVisibleY(), gameVals.playerWidth, gameVals.playerHeight);
        context.closePath();
    }
}

export default new Painter();