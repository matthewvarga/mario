import Player from "./Player";
import gameConfig from "../resources/config.json";
import Map from "../map/Map";

/**
 * checks the type of the tile beneath the players current position.
 * The player can potentially be over 2 tiles at once, so it returns 
 * both tiles that the player is currently over. If they are only over
 * 1 tile, it is returned twice. 
 * 
 * returns: [type of left tile player is over, type of right tile player is over]
 * 
 * NOTE: currently only checks the background layer.
 * 
 * primarily used for when a player tries to jump. Want to see if they are
 * jumping from a solid.
 */
export default function _checkTilesStateBelowPlayer() {
    // select the background layer
    let layer = Map.getLayer("foreground");

    // get the col and row the player is currently within
    let col1 = Math.floor(Player.getGlobalX() / gameConfig.map.tiles.width); // left tile player is over
    let col2 = Math.ceil(Player.getGlobalX() / gameConfig.map.tiles.width); // right tile player is over

    let row = Math.floor(Player.getGlobalY() / gameConfig.map.tiles.height);

    

    // get the number of columns the player takes up, and number of rows
    let numPlayerCols = Math.floor(Player.getHeight() / gameConfig.map.tiles.height);
    
    // if player is in the last row of the map (bottom - i.e nothing beneath them)
    // TODO: double check radius doesn't need to be accounted for in this check
    if(row >= (gameConfig.map.numRows - numPlayerCols)) {
        return null; // cant jump since nothing beneath them
    }

    // check if the tile below the player is a solid.
    let tileBeneathPlayerCol1 = col1; // left column for the tile beneath the player
    let tileBeneathPlayerCol2 = col2; // right column for the tile beneath the player
    let tileBeneathPlayerRow = row + numPlayerCols; // row for the tile beneath the player

    // get the left and right tiles beneath the player
    let tileBeneathPlayer1 = layer.getTile(tileBeneathPlayerCol1, tileBeneathPlayerRow);
    let tileBeneathPlayer2 = layer.getTile(tileBeneathPlayerCol2, tileBeneathPlayerRow);

    // get type of tyles benesath player. if the tiles are null, set to null.
    let tileBeneathPlayer1Type = (tileBeneathPlayer1 === null) ? null : tileBeneathPlayer1.getState();
    let tileBeneathPlayer2Type = (tileBeneathPlayer2 === null) ? null : tileBeneathPlayer2.getState();


    // return their type
    return [tileBeneathPlayer1Type, tileBeneathPlayer2Type];
}