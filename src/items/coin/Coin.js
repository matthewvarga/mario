import Item from "../Item";
/**
 * Coin Item
 */
export default class Coin extends Item {

    /**
     * Coin item.
     * @param {*} x - top left x coord of items hitbox
     * @param {*} y - top left y coord of items hitbox
     * @param {*} c - column of map the item is in
     * @param {*} r - row of map the items is in
     * @param {*} w - width of items hitbox
     * @param {*} h - height of items hitbox
     * @param {*} hx - top left x coord of item hitbox
     * @param {*} hy - top left y coord of item hitbox
     * @param {*} hw - width of items hitbox
     * @param {*} hy - height of items hitbox
     * @param {*} sprite - sprite of item
     * @param {*} value - the value of the coin
     */
    constructor(x, y, c, r, w, h, hx, hy, hw, hh, sprite, value){
        super(x, y, c, r, w, h, hx, hy, hw, hh, sprite, "COIN");

        this._value = value;
    }

    getValue() {
        return this._value;
    }
    
}