
import gameConfig from "../../resources/config.json";

/**
 * provided a sprite value, returns teh x coordinate on the spritesheet.
 * 
 * @param {*} sprite - int value associated with sprite 
 */
export default function _getSpriteXCoord(sprite) {
    let spriteWidth = gameConfig.spriteSheet.sprites.width;
    let numSpritesheetCols = gameConfig.spriteSheet.numCols;

    let spriteColumn = Math.floor(sprite/numSpritesheetCols);
    let spriteRow = sprite - (spriteColumn * numSpritesheetCols);

    let spriteX = spriteRow * spriteWidth;

    return spriteX;
}