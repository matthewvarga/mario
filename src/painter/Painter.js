import Map from "../map/Map";
import Player from "../player/Player";
import gameConfig from "../config.json";

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
     * draws the tiles provided from the origin on the screen
     * @param {*} tiles 
     */
    drawTiles(tiles, horizontalOffset) {
        let context = this.getcontext();
        let tileWidth = gameConfig.map.tiles.width;
        let tileHeight = gameConfig.map.tiles.height;
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;
        let numSpritesheetCols = gameConfig.spriteSheet.numCols;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;

        this.clear();

        for(let y = 0; y < tiles.length; y++) {
            for(let x = 0; x < tiles[y].length; x++) {

                let sprite = tiles[y][x].sprite;
                    
                // the sprites top left y coord on spritesheet
                let spriteY = Math.floor(sprite/numSpritesheetCols) * spriteHeight;
                // the sprites top left x coord on spritesheet
                let spriteX = ((sprite % numSpritesheetCols) -1 )* spriteWidth;


                if(playerVisibleX === centerView) {
                    context.beginPath();
                    context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tileWidth + horizontalOffset, y*tileHeight, tileWidth, tileHeight);
                    context.closePath();

                }
                else {
                    context.beginPath();
                    context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
                    context.closePath();
                }
            }
        }
    }

    _getSurroundingTilesForCollision() {
        let globalX = Player.getGlobalX();
        let horizontalOffset = globalX%Player.getWidth();
        let globalY = Player.getGlobalY();

        let playerCol = Math.floor(globalX / Player.getWidth());
        let playerRow = Math.floor(globalY / Player.getHeight());

        let layer = Map.getLayer("background");
        console.log("playerCol: " + playerCol);

        let section;

        // first col
        if(playerCol == 0){
            section = layer.getSection(playerCol, playerCol+2, playerRow-1, playerRow+2);
        console.log(section);
        }
        // last col
        else if(playerCol == (gameConfig.map.numCols -2)) {
            section = layer.getSection(playerCol-1, playerCol+1, playerRow-1, playerRow+2)
        }
        else {
            section = layer.getSection(playerCol-1, playerCol+2, playerRow-1, playerRow+2);
        }
        
        console.log(section);
        this.drawTilesTest(section, horizontalOffset);
    }

    drawTilesTest(tiles, horizontalOffset) {
        let context = this.getcontext();
        let tileWidth = gameConfig.map.tiles.width;
        let tileHeight = gameConfig.map.tiles.height;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;

        //this.clear();

        for(let y = 0; y < tiles.length; y++) {
            for(let x = 0; x < tiles[y].length; x++) {

                context.beginPath();
                context.fillStyle = "#00CC00";
                context.fillRect(Player.getVisibleX() + x*tileWidth -48, Player.getVisibleY() + y*tileHeight - 48, tileWidth, tileHeight);
                context.closePath();
            }
        }
    }

    drawVisibleTilesAroundPlayer(layerName) {
        let layer = Map.getLayer(layerName);

        let playerVisibleX = Player.getVisibleX();
        let playerGlobalX = Player.getGlobalX();

        let mapMaxWidth = (Map.getNumCols() - 1) * gameConfig.map.tiles.width;
        let centerView = gameConfig.screen.viewWidth / 2;

        let playerCol = Math.floor(playerGlobalX/48);

        let section;

        let numBufferCols = gameConfig.screen.bufferCols;

        // in the center of screen, even number of cols on each side
        if(playerVisibleX === centerView) {
            let startCol = playerCol - Math.floor(Map.getNumVisibleCols()/2);
            let endCol = playerCol + Math.floor(Map.getNumVisibleCols()/2) + numBufferCols;

            section = layer.getSection(startCol, endCol, 0, Map.getNumVisibleRows());
        }
        // last tiles
        else if(playerGlobalX >= (mapMaxWidth - centerView)) {
            section = layer.getSection(Map.getNumCols() - Map.getNumVisibleCols() , Map.getNumRows(), 0, Map.getNumVisibleRows());
        }
        // first tiles
        else {
            section = layer.getSection(0, Map.getNumVisibleCols() + numBufferCols, 0, Map.getNumVisibleRows());
        }

        this.drawTiles(section, -(playerGlobalX%48));
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