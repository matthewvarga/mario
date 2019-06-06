import Map from "../map/Map";
import Player from "../player/Player";
import gameConfig from "../resources/config.json";

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
        let numSpritesheetCols = gameConfig.spriteSheet.numCols;

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
                    let sprite = tiles[y][x].getSprite();
                    
                    let spriteColumn = Math.floor(sprite/numSpritesheetCols);
                    let spriteRow = sprite - (spriteColumn * numSpritesheetCols);
    
                    let spriteY = spriteColumn * spriteHeight;
                    let spriteX = spriteRow * spriteWidth;
    
    
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

        // get players visible x coord and their global x coord
        let playerVisibleX = Player.getVisibleX();
        let playerGlobalX = Player.getGlobalX();

        // calculate the maps max width
        let mapMaxWidth = (Map.getNumCols() - 1) * gameConfig.map.tiles.width;

        // calculate the center of the visible screen
        let centerView = gameConfig.screen.viewWidth / 2;

        // select which column the player is in
        let playerCol = Math.floor(playerGlobalX/48);

        let section;

        // get the number of buffer columns from game config
        let numBufferCols = gameConfig.screen.bufferCols;

        // player is in the center of screen, even number of cols on each side
        if(playerVisibleX == centerView) {
            let startCol = playerCol - Math.floor(Map.getNumVisibleCols()/2);
            let endCol = playerCol + Math.floor(Map.getNumVisibleCols()/2) + numBufferCols;

            section = layer.getSection(startCol, endCol, 0, Map.getNumVisibleRows());
        }
        // player is at end of screen (on the last visible tiles)
        else if(playerGlobalX >= (mapMaxWidth - centerView)) {
            section = layer.getSection(Map.getNumCols() - Map.getNumVisibleCols() , Map.getNumCols(), 0, Map.getNumVisibleRows());
        }
        // player is at start of screen (on the first tiles)
        else {
            section = layer.getSection(0, Map.getNumVisibleCols() + numBufferCols, 0, Map.getNumVisibleRows());
        }

        this.drawTiles(section, -(playerGlobalX%48), layerName);
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