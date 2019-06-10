
/**
 * A class representation of a single Item.
 */
export default class Item {

    /**
     * 
     * Creates an Item provided the following values.
     * 
     * The items hitbox is determined by its x,y,w,h values. 
     * It's hitbox is a square with the top-left corner
     * being x,y with a specified width and height.
     * 
     * It is drawn in the provided column and row.
     * 
     * @param {*} x - top left x coord of items hitbox
     * @param {*} y - top left y coord of items hitbox
     * @param {*} c - column of map the item is in
     * @param {*} r - row of map the items is in
     * @param {*} w - width of items hitbox
     * @param {*} h - height of items hitbox
     * @param {*} sprite - sprite of item
     */
    constructor(x, y, c, r, w, h, sprite){
        this._x = x;
        this._y = y;
        this._c = c;
        this._r = r;
        this._w = w;
        this._h = h;
        this._sprite = sprite;

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
}