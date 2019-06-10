import Player from "../Player";
import gameConfig from "../../resources/config.json";
import Map from "../../map/Map";
import _handleTileCollisionHorizontally from "./utils/_handleTileCollisionHorizontally";
import _handleItemCollision from "./utils/_handleItemCollision";

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

    // get foreground layer
    let layer = Map.getLayer("foreground");

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

    // check and handle collision with tiles
    _handleTileCollisionHorizontally(playerObj, distance, layer);

    // check and handle collision with items
    _handleItemCollision();
}