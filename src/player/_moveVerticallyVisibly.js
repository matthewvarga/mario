import Player from "./Player";
import gameConfig from "../resources/config.json";

export default function _moveVerticallyVisibly() {
    let globalY = Player.getGlobalY();
    let mapMaxHeight = (gameConfig.map.numRows) * gameConfig.map.tiles.height;
    let centerView = gameConfig.screen.viewHeight / 2;

    // player is above half of screen
    if(globalY <= centerView) {
        Player.setVisibleY(globalY);
    }
    // player is below half of screen
    else if(globalY >= (mapMaxHeight - centerView)) {
        let distanceFromBottomOfScreen = mapMaxHeight - globalY;
        let visibleY = gameConfig.screen.viewHeight - distanceFromBottomOfScreen;
        Player.setVisibleY(visibleY);
    }
    // player is centered vertically in screen
    else {
        Player.setVisibleY(centerView);
    }
}