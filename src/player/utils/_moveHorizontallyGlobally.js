import Player from "../Player";
import gameConfig from "../../resources/config.json";
import getSurroundingTiles from "../../utils/getSurroundingTiles";
import collidesAny from "../../utils/collisionDetection/collidesAny";
import Map from "../../map/Map";

/**
 * private method, that sets the global x value of the player.
 * @param {Integer} distance - distance player is trying to move
 */
export default function _moveHorizontallyGlobally(distance) {
    // get players current x coord
    let globalX = Player.getGlobalX();
    // set new x coord with the distance travelled
    let newX = globalX + distance;
    // get width of the game map
    let mapMaxWidth = (gameConfig.map.numCols - 1) * gameConfig.map.tiles.width;
    // get player radius
    let playerRadius = Player.getCollisionDetectionRadius();
    // get foreground layer
    let layer = Map.getLayer("foreground");

    let surroundingTiles;
    // create a player object containing the players position and size
    let playerObj = {
        x: null,
        y: Player.getGlobalY(),
        w: Player.getWidth(),
        h: Player.getHeight()
    };

    // if player moved off the map to the left (start), reset to 0.
    if(newX <= 0) { 
        playerObj.x = 0;
    }
    // if player moved off the map to right (end), reset to end of map
    else if(newX >= mapMaxWidth) {
        playerObj.x = mapMaxWidth;
    }
    // otherwise, they are still within the map and do not make any changes
    else {
        playerObj.x = newX;
    }

    // retrieve the tiles surrounding the player
    surroundingTiles = getSurroundingTiles(playerObj, playerRadius, layer);

    let collisionTiles = collidesAny(playerObj,surroundingTiles);
    
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