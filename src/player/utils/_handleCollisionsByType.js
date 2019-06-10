import Coin from "../../items/coin/Coin";
import Items from "../../items/Items";
/**
 * Takes a list of tiles that the player collided with, and
 * handles them appropriately.
 * 
 * For example: if tile is type: ?, then spawns the coin above it.
 * 
 * @param {*} collisionTiles 
 * @param {*} dir - direction player was moving when they collided 
 */
export default function _handleCollisionsByType(collisionTiles, dir) {
    for(let i = 0, len = collisionTiles.length; i < len; i++) {
        let tile = collisionTiles[i];

        switch(tile.getType()) {
            case "BRICK":
                break;
            case "?":
                // spawn new coin if collided with TOP of the block
                if(dir == "TOP") {
                    let coin = new Coin(tile.getX(),
                                        tile.getY(),
                                        tile.getCol(), // col of ? block
                                        tile.getRow() - 1, // row above ? block
                                        tile.getWidth(),
                                        tile.getHeight(),
                                        56, // sprite for coin
                                        1 // value of coin
                                    );

                    Items.setItem(tile.getCol(), tile.getRow() - 1, coin);
                }
                break;
            default:
                break;
        }
    }
}