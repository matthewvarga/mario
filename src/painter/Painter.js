import Map from "../map/Map";
import Player from "../player/Player";
import gameConfig from "../resources/config.json";
import Items from "../items/Items";
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
     * draws the tiles provided from the origin on the screen
     * @param {*} tiles 
     */
    drawTiles(tiles, horizontalOffset) {
        let context = this.getcontext();
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;

        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;

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
    drawItem(item, horizontalOffset, col) {
        let context = this.getcontext();
        let spriteWidth = gameConfig.spriteSheet.sprites.width;
        let spriteHeight = gameConfig.spriteSheet.sprites.height;
        let playerVisibleX = Player.getVisibleX();
        let centerView = gameConfig.screen.viewWidth / 2;

        let sprite = item.getSprite();
        let spriteY = _getSpriteYCoord(sprite);
        let spriteX = _getSpriteXCoord(sprite);


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

    /**
     * draws the tiles within the players range of view for the specified layer. 
     * @param {*} layerName - the name of the layer tile will be drawn from.
     */
    drawVisibleTilesAroundPlayer(layerName) {
        // select the layer we will be drawing
        let layer = Map.getLayer(layerName);

        // get visible rows and cols
        let bounds = _getVisibleTileBounds();

        let section = layer.getSection(bounds.startCol, bounds.endCol, bounds.startRow, bounds.endRow);
        this.drawTiles(section, -(Player.getGlobalX()%48));
    }

    /**
     * draws the items within the players range of view.
     */
    drawItemsAroundPlayer() {
        // no items around the player. 
        if (Items.getNumItems() === 0) {
            return;
        }
        // get visible rows and cols
        let bounds = _getVisibleTileBounds();

        // loop through the visible rows and cols, and see if there are
        // any items within any of the tiles. 
        for(let r = bounds.startRow; r <= bounds.endRow; r++) {
            for(let c = bounds.startCol; c <= bounds.endCol; c++) {
                let item = Items.getItem(c, r);

                // if there is an item on the current tile, draw it.
                if(item) {
                    // the game map column the player is currently in
                    let playerCol = Math.floor(Player.getGlobalX() / 48);

                    // the screen column the player is currently in
                    let playerVisibleCol = Math.floor(Player.getVisibleX() / 48);
                    
                    // the number of columns between the player and the item
                    let itemColOffset = (item.getCol() -1) - playerCol; // need to subtract extra 1 becuse items count start from 1 ?? TODO: check/fix

                    // the screen column the item is in
                    let itemCol = playerVisibleCol + itemColOffset;

                    this.drawItem(item, -(Player.getGlobalX()%48), itemCol);
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