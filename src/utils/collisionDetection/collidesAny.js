import collides from "./collides";

/**
 * Checks if the object provided collides with any of the tiles within
 * the provided tileSection.
 * 
 * @param {*} obj1 - object we are checking collision with. Should have
 *                 - the form {x: int,
 *                             y: int,
 *                             w: int,
 *                             h: int}
 * @param {*} tileSection - TODO
 */
export default function collidesAny(obj1, tileSection) {

    // loop through each tile within the tile section, and check if any
    // tiles collide with the object.
    for(let y = 0; y < tileSection.length; y++) {
        for(let x = 0; x < tileSection[y].length; x++) {
            let tile = tileSection[y][x];

            // only check for collision with non-null tiles
            if(tile != null) {
                let tileObj = {
                    x: tile.getX(),
                    y: tile.getY(),
                    w: tile.getWidth(),
                    h: tile.getHeight()
                }
    
    
                if(collides(obj1, tileObj) && tile.getState() === "SOLID") {
                    return tile
                };
            }
        }
    }
    return false;
}