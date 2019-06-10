import Coin from "../items/coin/Coin";
import Items from "../items/Items";
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
            case "?": // SPAWN COIN
                console.log("COLLISION WITH ?");
                console.log(collisionTiles[i]);
                // spawn new coin
                let coin = new Coin(tile.getX(),
                                    tile.getY(),
                                    tile.getCol(),
                                    tile.getRow() - 1,
                                    tile.getWidth(),
                                    tile.getHeight(),
                                    56,
                                    1
                                );

                Items.setItem(tile.getCol(), tile.getRow() - 1, coin);

                break;
        }
    }
}