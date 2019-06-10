
import gameConfig from "../../resources/config.json";

/**
 * provided a sprite value, returns the y coordinate on the spritesheet.
 * 
 * @param {*} sprite - int value associated with sprite 
 */
export default function _getSpriteYCoord(sprite) {
    
    let spriteHeight = gameConfig.spriteSheet.sprites.height;
    let numSpritesheetCols = gameConfig.spriteSheet.numCols;
    let spriteColumn = Math.floor(sprite/numSpritesheetCols);

    let spriteY = spriteColumn * spriteHeight;

    return spriteY;
}