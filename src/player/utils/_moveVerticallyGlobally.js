import Player from "../Player";
import Map from "../../map/Map";
import getSurroundingTiles from "../../utils/getSurroundingTiles";
import collidesAny from "../../utils/collisionDetection/collidesAny";
import gameConfig from "../../resources/config.json";
import _handleCollisionsByType from "./_handleCollisionsByType";

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
    let playerRadius = Player.getCollisionDetectionRadius();
    let  layer = Map.getLayer("foreground");
    let surroundingTiles;

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

    surroundingTiles = getSurroundingTiles(playerObj, playerRadius, layer);
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