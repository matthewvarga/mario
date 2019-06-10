import Player from "../Player";
import Map from "../../map/Map";
import gameConfig from "../../resources/config.json";
import _handleCollisionsByType from "./_handleCollisionsByType";
import _handleTileCollisionVertically from "./utils/_handleTileCollisionVertically";
import _handleItemCollision from "./utils/_handleItemCollision";

/**
 * private method, sets the global y position of the player
 * @param {Integer} distance - the distance the player is moving vertically 
 */
export default function _moveVerticallyGlobally() {
    // set velocity += gravity
    Player.setVelocityY(Player.getVelocityY() + Player.getGravity());
    // set new position += velocity
    let newY = Player.getGlobalY() + Player.getVelocityY();

    let mapMaxHeight = (gameConfig.map.numRows -1) * gameConfig.map.tiles.height;
    let  layer = Map.getLayer("foreground");

    let playerObj = {
        x: Player.getGlobalX(),
        y: null,
        w: Player.getWidth(),
        h: Player.getHeight()
    };

    // top of screen
    if(newY <= 0) { 
        playerObj.y = 0;
    }
    // fallen out of screen
    else if(newY >= mapMaxHeight) {
        playerObj.y = mapMaxHeight;
    }
    // within screen
    else {
        playerObj.y = newY;
    }

    // check and handle collision with tiles
    _handleTileCollisionVertically(playerObj, layer);
    
    // check and handle collision with items
    _handleItemCollision();

}