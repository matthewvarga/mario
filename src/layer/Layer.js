import InvalidColumnException from "../errors/InvalidColumnException";
import InvalidRowException from "../errors/InvalidRowException";

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

        // height and width of the tiles within the layer, deault: 48;
        this._tilewidth = tileWidth || 48;
        this._tileHeight = tileHeight || 48;
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
     * returns the width of the tiles within the layer.
     */
    getTileWidth() {
        return this._tilewidth;
    }

    /**
     * returns the height of the tiles within the layer.
     */
    getTileHeight() {
        return this._tileHeight;
    }

    /**
     * returns the (x,y) tile.
     * @param {Integer} x - row number of tile being retrieved.
     * @param {Integer} y - column number of tile being retrieved.
     */
    getTile(x, y) {
        return this._tiles[y][x];
    }

    /**
     * returns the layers tiles.
     */
    getTiles() {
        return this._tiles;
    }

    /**
     * returns the starting column for the surrounding group of the column provided.
     * @param {*} col - the column being surrounded.
     * @param {*} numSurroundingCols - the number of columns within the surrounding group.
     */
    _getSurroundingStartCol(col, numSurroundingCols) {
        if(col > this.getNumCols() || col < 0) {
            throw new InvalidColumnException("the column provided is not within the layers configuration.");
        }

        let startCol;

        // if the column is closer to zero column than the center of surrounding group
        if(col - Math.floor(numSurroundingCols/2) <= 0) {
            startCol = 0;
        }
        // if the column is closer to end column than the center of surrounding group
        else if(this.getNumCols() - col <= Math.floor(numSurroundingCols/2)) {
            startCol = this.getNumCols() - numSurroundingCols;
        }
        // otherwise, it can be centered
        else {
            startCol = col - Math.floor(numSurroundingCols/2);
        }

        return startCol;
    }

    /**
     * returns the starting row for the surrounding group of the row provided.
     * @param {*} row - the row being surrounded.
     * @param {*} numSurroundingRows - the number of rows within the surrounding group.
     */
    _getSurroundingStartRow(row, numSurroundingRows) {
        if(row > this.getNumRows() || row < 0) {
            throw new InvalidColumnException("the column provided is not within the layers configuration.");
        }
        let startRow;

        // if the row is closer to zero row than the center of surrounding group
        if(row - Math.floor(numSurroundingRows/2) <= 0) {
            startRow = 0;
        }
        // if the row is closer to end row than the center of surrounding group
        else if(this.getNumRows() - row <= Math.floor(numSurroundingRows/2)) {
            startRow = this.getNumRows() - numSurroundingRows;
        }
        // otherwise, it can be centered
        else {
            startRow = row - Math.floor(numSurroundingRows/2);
        }

        return startRow;
    }

    /**
     * retrieves the surrounding columns around the specified column, trying to center it when possible.
     * @param {Integer} col - the column being surrounded
     * @param {Integer} row - the row being surrounded
     * @param {Integer} numSurroundingCols - the total number of columns in the surrounding group
     * @param {Integer} numSurroundingRows - the total number of rows in the surrounding group
     */
    getSurroundingTiles(col, row, numSurroundingCols, numSurroundingRows) {
        try {
            let startingCol = this._getSurroundingStartCol(col, numSurroundingCols);
            let startingRow = this._getSurroundingStartRow(row, numSurroundingRows);

            console.log("startingCol: " + startingCol);
            console.log("startingRow: " + startingRow);

            let surroundingTiles = this.getTiles().slice(startingRow, startingRow+numSurroundingRows);

            // retrieve the surrounding subset of tiles
            for(let i = 0; i < surroundingTiles.length; i++) {
                surroundingTiles[i] = surroundingTiles[i].slice(startingCol, startingCol+numSurroundingCols);
            }

            return surroundingTiles;

        }
        catch(InvalidColumnException) {
            throw InvalidColumnException;
        }

        if(row > this.getNumRows || row < 0) {
            throw new InvalidRowException("the row provided is not within the layers configuration.");
        }
        
    }
}