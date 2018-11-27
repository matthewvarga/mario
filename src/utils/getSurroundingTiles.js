import gameConfig from "../config.json";

/**
 * returns the surrounding tiles around the obj with provided radius.
 * 
 * The object must contains the following fields:
 *  x: the top left x coord of rectangle
 *  y: the top right y coord of rectangle
 *  w: the width of the rectangle
 *  h: the height of the rectangle
 * @param {*} obj
 * @param {*} radius - radius of surrounding tiles around obj 
 */
export default function getSurroundingTiles(obj, radius, layer) {
    let col = Math.floor(obj.x / obj.w);
    let row = Math.floor(obj.y / obj.h);

    let section;

    let startCol = null;
    let endCol = null;
    let startRow = null;
    let endRow = null;

    // obj is in first col
    if((col - radius) <= 0){
        startCol = col;
        endCol = col + radius + 1;
    }
    // objs is in last col
    else if(col == (gameConfig.map.numCols - (radius + 1))) {
        startCol = col - radius;
        endCol = col + 1;
    }
    // obj is in between
    else {
        startCol = col - radius;
        endCol = col + radius + 1;
        console.log("startCol: " + startCol);
        console.log("endCol: " + endCol);
    }

    // if obj is in first row
    if((row - radius) <= 0) {
        startRow = row;
        endRow = row + radius + 1;
    }
    // if obj is in last row
    else if(row == (gameConfig.map.numRows - (radius +1))) {
        startRow = row - radius;
        endRow = row + 1;
    }
    // obj is in between
    else {
        startRow = row - radius;
        endRow = row + radius + 1;
    }

    section = layer.getSection(startCol, endCol, startRow, endRow);

    return section;
}