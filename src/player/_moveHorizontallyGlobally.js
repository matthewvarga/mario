import Player from "./Player";
import gameConfig from "../resources/config.json";
import getSurroundingTiles from "../utils/getSurroundingTiles";
import collidesAny from "../utils/collisionDetection/collidesAny";
import Map from "../map/Map";

/**
 * private method, that sets the global x value of the player.
 * @param {Integer} distance - distance player is trying to move
 */
export default function _moveHorizontallyGlobally(distance) {
    let globalX = Player.getGlobalX();
    let newX = globalX + distance;
    let mapMaxWidth = (gameConfig.map.numCols - 1) * gameConfig.map.tiles.width;
    let playerRadius = Player.getCollisionDetectionRadius();
    let layer = Map.getLayer("background");
    let surroundingTiles;
    let playerObj = {
        x: null,
        y: Player.getGlobalY(),
        w: Player.getWidth(),
        h: Player.getHeight()
    };

    if(newX <= 0) { 
        playerObj.x = 0;
    }
    else if(newX >= mapMaxWidth) {
        playerObj.x = mapMaxWidth;
    }
    else {
        playerObj.x = newX;
    }

    surroundingTiles = getSurroundingTiles(playerObj, playerRadius, layer);

    let collisionTile = collidesAny(playerObj,surroundingTiles);
    // if there are no collisions with the player and the intended movement, then upda
    if(!collisionTile) {
        Player.setGlobalX(playerObj.x);
    } 
    // collision
    else {
        // align the player on proper side of block depending on their direction
        (distance < 0) ? Player.setGlobalX(collisionTile.getX() + Player.getWidth()): Player.setGlobalX(collisionTile.getX() - Player.getWidth());
    }
}