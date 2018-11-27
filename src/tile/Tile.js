import GameConfig from "../config.json";

export default class Tile {

    /**
     * Takes in formatted json from the game map, and create a Tile object.
     * 
     * tile must contain the following fields:
     *  - col: the column of the tile within the map
     *  - row: the row of the tile within the map
     *  - sprite: the sprite code within the spritesheet
     *  - type (optional): the type of the tyle 
     * @param {Object} tile 
     */
    constructor(tile){
        this._x = tile.col * GameConfig.map.tiles.width - GameConfig.map.tiles.width;
        this._y = tile.row * GameConfig.map.tiles.width - GameConfig.map.tiles.height;
        this._c = tile.col;
        this._r = tile.row;
        this._w = GameConfig.map.tiles.width;
        this._h = GameConfig.map.tiles.height;
        this._sprite = tile.sprite;
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
    getType() {
        return this._type;
    }
}