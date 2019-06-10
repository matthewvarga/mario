import Map from "../map/Map";
import Player from "../player/Player";
import gameConfig from "../resources/config.json";
import _getSpriteXCoord from "./utils/_getSpriteXCoord";
import _getSpriteYCoord from "./utils/_getSpriteYCoord";
import _getVisibleTileBounds from "./utils/_getVisibleTileBounds";

class Painter {

    constructor(){
        // stores the canvas context
        this._context = null;
        this._canvas = null;

        this._spriteSheet = null;
    }

    getSpriteSheet() {
        return this._spriteSheet;
    }

    setSpriteSheet(spritesheet) {
        this._spriteSheet = spritesheet;
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
     * draws a square outline wuith the colour provided
     * @param {*} square {x: int, y: int, w: int, h: int} coords of square being drawn
     * @param {*} colour colour of outline
     */
    drawSquareOutline(square, colour) {
        let context = this.getcontext();

        context.beginPath();

        context.lineWidth = "2";
        context.strokeStyle = colour;
        context.rect(square.x, square.y, square.w, square.h);
        context.stroke();

        context.closePath();
    }

    /**
     * draws the tiles provided from the origin on the screen
     * @param {*} tiles 
     */
    drawTiles(tiles, horizontalOffset, layerName) {
        let context = this.getcontext();
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;


        // set debug outline colours for each layer
        let outlineColour;
        switch(layerName) {
            case "background":
                outlineColour = "red";
                break;
            case "foreground":
                outlineColour = "blue";
                break;
            default:
                outlineColour = "black";
        }

        for(let y = 0; y < tiles.length; y++) {
            for(let x = 0; x < tiles[y].length; x++) {
                let tile = tiles[y][x];

                // do nothing tile is null, as there is nothing to be drawn
                if (tile != null) {
                    let sprite = tile.getSprite();
                    let spriteY = _getSpriteYCoord(sprite);
                    let spriteX = _getSpriteXCoord(sprite);
    
                    if(playerVisibleX === centerView) {
                        context.beginPath();
                        
                        // draw the sprite
                        context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tile.getWidth() + horizontalOffset, y*tile.getHeight(), tile.getWidth(), tile.getHeight());
                        
                        // draw the outline
                        this.drawSquareOutline({
                            x: x*tile.getWidth() + horizontalOffset,
                            y: y*tile.getHeight(),
                            w: tile.getWidth(),
                            h: tile.getHeight()
                        },outlineColour);

                        context.closePath();
    
                    }
                    else {
                        context.beginPath();

                        // draw the sprite
                        context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tile.getWidth(), y*tile.getHeight(), tile.getWidth(), tile.getHeight());
                        
                         // draw the outline
                         this.drawSquareOutline({
                            x: x*tile.getWidth(),
                            y: y*tile.getHeight(),
                            w: tile.getWidth(),
                            h: tile.getHeight()
                        },outlineColour);

                        context.closePath();
                    }
                }
                
            }
        }
    }

    drawVisibleTilesAroundPlayer(layerName) {
        // select the layer we will be drawing
        let layer = Map.getLayer(layerName);

       // get visible rows and cols
       let bounds = _getVisibleTileBounds();

       let section = layer.getSection(bounds.startCol, bounds.endCol, bounds.startRow, bounds.endRow);
       this.drawTiles(section, -(Player.getGlobalX()%48), layerName);
   }

    drawPlayer() {
        let context = this.getcontext();

        context.beginPath()
        context.fillStyle="red";
        context.fillRect(Player.getVisibleX(), Player.getVisibleY(), Player.getWidth(), Player.getHeight());
        context.closePath();
    }
}

export default new Painter();