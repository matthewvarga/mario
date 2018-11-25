import gameConfig from "../config.json";

class Map {

    constructor(){
        // stores all of the maps layers
        this._layers = {};

        // the number of columns and rows of the entire map
        this._numCols = gameConfig.map.numCols;
        this._numRows = gameConfig.map.numRows;

        // the number of visible columns and rows
        this._visibleRows = gameConfig.map.numVisibleRows;
        this._visibleCols = gameConfig.map.numVisibleCols;
    }

    getNumCols() {
        return this._numCols;
    }

    getNumRows() {
        return this._numRows;
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