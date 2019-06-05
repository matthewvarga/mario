import gameConfig from "../resources/config.json";

/**
 * returns the surrounding tiles around the obj with provided radius.
 * 
 * The object must contains the following fields:
 *  x: the top left x coord of rectangle
 *  y: the top right y coord of rectangle
 *  w: the width of the rectangle
 *  h: the height of the rectangle
 * @param {*} obj - object containing the following values:
 *                  {x: int, - x coord of the object
 *                   y: int, - y coord of the object
 *                   w: int, - width of the object
 *                   h: int} - height of the object
 * @param {*} radius - radius of surrounding tiles around obj 
 * @param {*} layer - the layer we are checking the collision on
 */
export default function getSurroundingTiles(obj, radius, layer) {
    // get the row and column the obj is currently within
    let col = Math.floor(obj.x / gameConfig.map.tiles.width);
    let row = Math.floor(obj.y / gameConfig.map.tiles.height);

    // how many cols the object is tall and wide. Ex: for player (1 col wide, 2 tall,
    // the objHeightCol would be 2, and objWidthCol would be 1).
    let objHeightCol = Math.floor(obj.h / gameConfig.map.tiles.height);
    let objWidthCol = Math.floor(obj.w / gameConfig.map.tiles.width);

    let section;

    let startCol = null;
    let endCol = null;
    let startRow = null;
    let endRow = null;

    // obj is in first col of map.
    if((col - radius) <= 0){
        startCol = col;
        endCol = col + radius + objWidthCol;
    }
    // objs is in last col of map
    else if(col === (gameConfig.map.numCols - (radius + objWidthCol))) {
        startCol = col - radius;
        endCol = col + objWidthCol;
    }
    // obj is in between
    else {
        startCol = col - radius;
        endCol = col + radius + objWidthCol;
    }

    // if obj is in first row of map (top)
    if((row - radius) <= 0) {
        startRow = row;
        endRow = row + objHeightCol + radius;
    }
    // if obj is in last row map (bottom)
    else if(row >= (gameConfig.map.numRows - objHeightCol)) {
        startRow = row - radius;
        endRow = row + objHeightCol;
    }
    // obj is in between
    else {
        startRow = row - radius;
        endRow = row + radius + objHeightCol;
    }

    section = layer.getSection(startCol, endCol, startRow, endRow);

    return section;
}