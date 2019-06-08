import gameConfig from "../resources/config.json";

export default class Tile {

    /**
     * Takes in formatted json from the game map, and create a Tile object.
     * 
     * tile must contain the following fields:
     *  - col: the column of the tile within the map
     *  - row: the row of the tile within the map
     *  - sprite: the sprite code within the spritesheet
     *  - state: the state of the block (i.e SOLID, ) 
     *  - type (optional): the type of the tyle (i.e. BRICK)
     * @param {Object} tile 
     */
    constructor(tile){
        this._x = tile.col * gameConfig.map.tiles.width - gameConfig.map.tiles.width;
        this._y = tile.row * gameConfig.map.tiles.width - gameConfig.map.tiles.height;
        this._c = tile.col;
        this._r = tile.row;
        this._w = gameConfig.map.tiles.width;
        this._h = gameConfig.map.tiles.height;
        this._sprite = tile.sprite;
        this._state = tile.state;
        this._type = tile.type;
    }

    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    getCol() {
        return this._c;
    }
    getRow() {
        return this._r;
    }
    getWidth() {
        return this._w;
    }
    getHeight() {
        return this._h;
    }
    getSprite() {
        return this._sprite;
    }
    getState() {
        return this._state;
    }
    getType() {

    }
}