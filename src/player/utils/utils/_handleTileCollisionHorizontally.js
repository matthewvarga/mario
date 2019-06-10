import Player from "../../Player";
import _handleCollisionsByType from "../_handleCollisionsByType";
import getSurroundingTiles from "../../../utils/getSurroundingTiles";
import collidesAny from "../../../utils/collisionDetection/collidesAny";
/**
 * checks for collision between any tiles with the playerObj on the layer provided.
 * @param {*} playerObj - object containing {x, y, w, h}
 * @param {*} distance - distance player moved (- is left, + is right)
 * @param {*} layer - the layer to check collisions on
 */
export default function _handleTileCollisionHorizontally(playerObj, distance, layer) {
    // retrieve the tiles surrounding the player
    let surroundingTiles = getSurroundingTiles(playerObj, Player.getCollisionDetectionRadius(), layer);
    let collisionTiles = collidesAny(playerObj,surroundingTiles);

    // collided while moving horizontally. Check if moving left or right.
    let dir = (Player.getVelocityX() > 0) ? "RIGHT" : "LEFT";

    // if there are no collisions with the player and the intended movement, then upda
    if(!collisionTiles.length) {
        Player.setGlobalX(playerObj.x);
    } 
    // collision
    else {
        // align the player on proper side of block depending on their direction
        // TODO: double check that using first collision tile is fine
        (distance < 0) ? Player.setGlobalX(collisionTiles[0].getX() + Player.getWidth()): Player.setGlobalX(collisionTiles[0].getX() - Player.getWidth());
    }
}