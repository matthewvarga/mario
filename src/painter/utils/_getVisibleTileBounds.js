import Map from "../../map/Map";
import Player from "../../player/Player";
import gameConfig from "../../resources/config.json";

/**
 * Returns an object containing the bounding visible tiles.
 * 
 * Ex: If the rows 1 through 12 were visible, from columns 16 to 31,
 *     The returned object would be:
 *  
 *      {
 *          startCol: 16
 *          endCol: 31
 *          startRow: 1
 *          endRow: 12
 *      }
 * 
 * @param {*} sprite - int value associated with sprite 
 */
export default function _getVisibleTileBounds() {

    let bounds = {
        startCol: 0,
        endCol: 0,
        startRow: 0,
        endRow: 0
    };

    // get players visible x coord and their global x coord
    let playerVisibleX = Player.getVisibleX();
    let playerGlobalX = Player.getGlobalX();

    // calculate the maps max width
    let mapMaxWidth = (Map.getNumCols() - 1) * gameConfig.map.tiles.width;

    // calculate the center of the visible screen
    let centerView = gameConfig.screen.viewWidth / 2;

    // select which column the player is in
    let playerCol = Math.floor(playerGlobalX/48);

    // get the number of buffer columns from game config
    let numBufferCols = gameConfig.screen.bufferCols;
    
    // player is in the center of screen, even number of cols on each side
    if(playerVisibleX === centerView) {
        bounds.startCol = playerCol - Math.floor(Map.getNumVisibleCols()/2);
        bounds.endCol = playerCol + Math.floor(Map.getNumVisibleCols()/2) + numBufferCols;
        bounds.startRow = 0;
        bounds.endRow = Map.getNumVisibleRows();
    }
    // player is at end of screen (on the last visible tiles)
    else if(playerGlobalX >= (mapMaxWidth - centerView)) {
        bounds.startCol = Map.getNumCols() - Map.getNumVisibleCols();
        bounds.endCol = Map.getNumCols();
        bounds.startRow = 0;
        bounds.endRow = Map.getNumVisibleRows()
    }
    // player is at start of screen (on the first tiles)
    else {
        bounds.startCol = 0;
        bounds.endCol = Map.getNumVisibleCols() + numBufferCols;
        bounds.startRow = 0;
        bounds.endRow = Map.getNumVisibleRows();
    }

    return bounds;
}