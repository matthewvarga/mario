import Tile from "../tile/Tile";

export default class Layer {

    constructor(tiles, tileWidth, tileHeight){
        // [[col, ... , col], <- row
        //  [col, ... , col], <- row
        //    .    .     .     
        //    .    .     .     
        //    .    .     .     
        //  [col, ... , col]] <- row
        // nested array of tiles.
        this._tiles = tiles || [[]];

        for(let y = 0; y < this._tiles.length; y++) {
            for(let x = 0; x < this._tiles[y].length; x++) {
                let tile = this._tiles[y][x];
                this._tiles[y][x] = new Tile(tile);
            }
        }
    }

    /**
     * returns the number of rows within the layer.
     */
    getNumRows() {
        return this._tiles.length;
    }

    /**
     * returns the number of columns within the layer.
     * Note: Assumes the number of columns are equal within each row.
     */
    getNumCols() {
        return this._tiles[0].length;
    }

    /**
     * returns the (x,y) tile.
     * @param {Integer} col - row number of tile being retrieved.
     * @param {Integer} row - column number of tile being retrieved.
     */
    getTile(col, row) {
        return this._tiles[row][col];
    }

    /**
     * returns the layers tiles.
     */
    getTiles() {
        return this._tiles;
    }

    /**
     * returns a section of the tiles
     * @param {Integer} startCol 
     * @param {Integer} endCol 
     * @param {Integer} startRow 
     * @param {Integer} endRow 
     */
    getSection(startCol, endCol, startRow, endRow) {
        let tiles = this.getTiles();
        let section = tiles.slice(startRow, endRow);

        for(let row = 0; row < section.length; row++) {
            section[row] = section[row].slice(startCol, endCol);
        }

        return section;
    }
}