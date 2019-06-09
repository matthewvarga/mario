import Player from "./Player";
import gameConfig from "../resources/config.json";
import Map from "../map/Map";

/**
 * Takes a list of tiles that the player collided with, and
 * handles them appropriately.
 * 
 * For example: if tile is type: ?, then spawns the coin above it.
 * 
 * @param {*} collisionTiles 
 */
export default function _handleCollisionsByType(collisionTiles) {
    for(let i = 0, len = collisionTiles.length; i < len; i++) {
        let tile = collisionTiles[i];

        switch(tile.getType()) {
            case "BRICK":
                break;
            case "?":
                // spawn coin
                break;
        }
    }
}