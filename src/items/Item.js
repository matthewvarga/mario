
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
     * @param {*} x - top left x coord of item
     * @param {*} y - top left y coord of item
     * @param {*} c - column of map the item is in
     * @param {*} r - row of map the items is in
     * @param {*} w - width of item
     * @param {*} h - height of item
     * @param {*} hx - top left x coord of item hitbox
     * @param {*} hy - top left y coord of item hitbox
     * @param {*} hw - width of items hitbox
     * @param {*} hy - height of items hitbox
     * @param {*} sprite - sprite of item
     */
    constructor(x, y, c, r, w, h, hx, hy, hw, hh, sprite, type = null){
        this._x = x;
        this._y = y;
        this._c = c;
        this._r = r;
        this._w = w;
        this._h = h;
        this._hx = hx;
        this._hy = hy;
        this._hw = hw;
        this._hh = hh;
        this._sprite = sprite;
        this._type = type; // implemented uniquely by each item
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

    getHitboxX() {
        return this._hx;
    }

    getHitboxY() {
        return this._hy;
    }

    getHitboxWidth() {
        return this._hw;
    }

    getHitboxHeight() {
        return this._hh;
    }
}