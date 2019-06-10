import Player from "../Player";
import gameConfig from "../../resources/config.json";

/**
* private method, that sets the visible x value of the player
*/
export default function _moveHorizontallyVisibily() {
    let globalX = Player.getGlobalX();
    let mapMaxWidth = (gameConfig.map.numCols) * gameConfig.map.tiles.width;
    let centerView = gameConfig.screen.viewWidth / 2;

    // start of map, player may not be in center of screen
    if(globalX <= centerView) {
        Player.setVisibleX(globalX);
    }
   // end of map, player may be past center of screen
     else if(globalX >= (mapMaxWidth - centerView)) {
        let distanceFromEndOfScreen = mapMaxWidth - globalX;
        let visibleX = gameConfig.screen.viewWidth - distanceFromEndOfScreen;
        Player.setVisibleX(visibleX);
    }    
    // player is centered in screen
    else {
        Player.setVisibleX(centerView);
    }
}