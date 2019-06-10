import Map from "../map/Map";
import Player from "../player/Player";
import gameConfig from "../resources/config.json";
import Items from "../items/Items";

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
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;
        let numSpritesheetCols = gameConfig.spriteSheet.numCols;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;

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
                        context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tile.getWidth() + horizontalOffset, y*tile.getHeight(), tile.getWidth(), tile.getHeight());
                        context.closePath();
    
                    }
                    else {
                        context.beginPath();
                        context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, x*tile.getWidth(), y*tile.getHeight(), tile.getWidth(), tile.getHeight());
                        context.closePath();
                    }
                }
                
            }
        }
    }

    /**
     * draws an Item
     * @param {*} item 
     */
    drawItem(item, horizontalOffset, col, row) {
        let context = this.getcontext();
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;
        let numSpritesheetCols = gameConfig.spriteSheet.numCols;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;


        let sprite = item.getSprite();
        
        let spriteColumn = Math.floor(sprite/numSpritesheetCols);
        let spriteRow = sprite - (spriteColumn * numSpritesheetCols);

        let spriteY = spriteColumn * spriteHeight;
        let spriteX = spriteRow * spriteWidth;


        if(playerVisibleX === centerView) {
            context.beginPath(); // need to subtract 1 from items row, sicne we start counting rowsd from 1 in map, but 0 in painter. TODO: double check
            context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, col * item.getWidth() + horizontalOffset, (item.getRow() -1) * item.getHeight(), item.getWidth(), item.getHeight());
            context.closePath();

        }
        else {
            context.beginPath();
            context.drawImage(this.getSpriteSheet(), spriteX, spriteY, spriteWidth, spriteHeight, col * item.getWidth(), (item.getRow() -1) * item.getHeight(), item.getWidth(), item.getHeight());
            context.closePath();
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

        this.drawTiles(section, -(playerGlobalX%48));
    }

    // draws the items visible to the player.
    // TODO: clean up
    drawItemsAroundPlayer() {

        if (Items.getNumItems() == 0) {
            return;
        }
        // get players visible x coord and their global x coord
        let playerVisibleX = Player.getVisibleX();
        let playerGlobalX = Player.getGlobalX();

        // calculate the maps max width
        let mapMaxWidth = (Map.getNumCols() - 1) * gameConfig.map.tiles.width;

        // calculate the center of the visible screen
        let centerView = gameConfig.screen.viewWidth / 2;

        // select which column the player is in
        let playerCol = Math.floor(playerGlobalX/48);

        // get the number of buffer columns from game config
        let numBufferCols = gameConfig.screen.bufferCols;

        let startCol = 0;
        let endCol = 0;
        let startRow = 0;
        let endRow = 0;

        // player is in the center of screen, even number of cols on each side
        if(playerVisibleX == centerView) {
            startCol = playerCol - Math.floor(Map.getNumVisibleCols()/2);
            endCol = playerCol + Math.floor(Map.getNumVisibleCols()/2) + numBufferCols;
            startRow = 0;
            endRow = Map.getNumVisibleRows();
        }
        // player is at end of screen (on the last visible tiles)
        else if(playerGlobalX >= (mapMaxWidth - centerView)) {
            startCol = Map.getNumCols() - Map.getNumVisibleCols();
            endCol = Map.getNumCols();
            startRow = 0;
            endRow = Map.getNumVisibleRows()
        }
        // player is at start of screen (on the first tiles)
        else {
            startCol = 0;
            endCol = Map.getNumVisibleCols() + numBufferCols;
            startRow = 0;
            endRow = Map.getNumVisibleRows();
        }

        for(let r = startRow; r <= endRow; r++) {
            for(let c = startCol; c <= endCol; c++) {
                let item = Items.getItem(c, r);
                if(item) {
                   
                    // the game map column the player is currently in
                    let playerCol = Math.floor(Player.getGlobalX() / 48);

                    // the screen column the player is currently in
                    let playerVisibleCol = Math.floor(Player.getVisibleX() / 48);
                    
                    // the number of columns between the player and the item
                    let itemColOffset = (item.getCol() -1) - playerCol; // need to subtract extra 1 becuse items count start from 1 ?? TODO: check/fix

                    // the screen column the item is in
                    let itemCol = playerVisibleCol + itemColOffset;

                    this.drawItem(item, -(playerGlobalX%48), itemCol);
                }
            }
        }
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