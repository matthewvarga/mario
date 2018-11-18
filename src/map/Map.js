class Map {

    constructor(){
        // stores all of the maps layers
        this._layers = {};

        // number of visible rows and columns, default: 3.
        this._visibleRows = 10;
        this._visibleCols = 10;
    }

    /**
     * sets a map layer. If one with the name already exists, overwrites it. 
     * @param {String} layerName - the name of the layer being set.
     * @param {Layer} layer - the layer being set.
     */
    setLayer(layerName, layer) {
        this._layers[layerName] = layer;
    }

    /**
     * returns the layer associated with the name provided.
     * @param {String} layerName 
     */
    getLayer(layerName) {
        return this._layers[layerName];
    }

    /**
     * Sets the number of rows visible to the value passed in.
     * @param {Integer} numRows 
     */
    setNumVisibleRows(numRows) {
        this._visibleRows = numRows;
    }

    /**
     * Sets the number of Columns visible to the value passed in.
     * @param {Integer} numCols 
     */
    setNumVisibleCols(numCols) {
        this._visibleCols = numCols;
    }

    /**
     * returns the number of visible rows.
     */
    getNumVisibleRows() {
        return this._visibleRows;
    }

    /**
     * returns the number of visible columns.
     */
    getNumVisibleCols() {
        return this._visibleCols;
    }
}

export default new Map();