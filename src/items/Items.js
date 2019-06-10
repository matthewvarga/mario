
/**
 * Singleton containing all of the items currently in the game.
 */
class Items {

    constructor(){
        // map of items. Should follow:
        // key: {col: int, row: int} <- row/col the Item is located in the game
        // value: Item <- the item
        this._items = new Map();
    }

    /**
     * returns a map of all Items.
     */
    getItems() {
        return this._items;
    }

    getNumItems() {
        return this._items.size;
    }

    /**
     * retrieves the iteam at col,row
     * @param {*} col - col in game map the item exists
     * @param {*} row - row in game map the items exists
     */
    getItem(col, row) {
        let key = col + "," + row;
        return this._items.get(key);
        
    }

    /**
     * sets the items at col,row in the Items map.
     * @param {*} col - col in game map the item exists
     * @param {*} row - row in game map the items exists
     * @param {*} item - Item being set
     */
    setItem(col, row, item) {
        let key = col + "," + row;
        this._items.set(key, item);

        console.log("item has been set");
        console.log(this.getItems());
    }

    /**
     * removes the item at col,row from the Items map
     * @param {*} col - col in game map the item exists
     * @param {*} row - row in game map the items exists
     */
    deleteItem(col, row) {
        let key = col + "," + row;
        this._items.delete(key);
    }

}

export default new Items();