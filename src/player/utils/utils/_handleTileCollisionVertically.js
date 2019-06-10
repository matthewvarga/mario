import Player from "../../Player";
import _handleCollisionsByType from "../_handleCollisionsByType";
import getSurroundingTiles from "../../../utils/getSurroundingTiles";
import collidesAny from "../../../utils/collisionDetection/collidesAny";
/**
 * checks for collision between any tiles with the playerObj on the layer provided.
 * @param {*} playerObj - object containing {x, y, w, h}
 * @param {*} layer - the layer to check collisions on
 */
export default function _handleTileCollisionVertically(playerObj, layer) {

    // check collision with items
    let surroundingTiles = getSurroundingTiles(playerObj, Player.getCollisionDetectionRadius(), layer);
    let collisionTiles = collidesAny(playerObj, surroundingTiles);

    // player collided with a block. handle it.
    if(collisionTiles.length) {
        // collided while moving vertically. Check if moving up or down.
        let dir = (Player.getVelocityY() > 0) ? "BOTTOM" : "TOP";
        _handleCollisionsByType(collisionTiles, dir);
    }
    

    // if there are no collisions with the player and the intended movement, then update
    if(!collisionTiles.length) {
        Player.setGlobalY(playerObj.y);
    } 
    // collision
    // TODO: double check it is fine to use first collision tile only
    else {
        
        // while moving up
        if (Player.getVelocityY() < 0) {
            Player.setGlobalY(collisionTiles[0].getY() + collisionTiles[0].getHeight());
        } 
        // while falling down
        else {
            Player.setGlobalY(collisionTiles[0].getY() - Player.getHeight());
        }
        // set players velocity to 0
        Player.setVelocityY(0);
    }
}