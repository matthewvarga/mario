import Map from "../../../map/Map";
import Player from "../../../player/Player";
import PainterDebugMode from "../../../painter/PainterDebugMode";
import gameConfig from "../../../resources/config.json";
import getSurroundingTiles from "../../../utils/getSurroundingTiles";

/**
 * draws yellow outline around surrounding tiles used to check for collision with the player
 * needs to be done here instead of in collision checking, as that is done before the map is
 * drawn, so the oulines would be drawn over.
 */
export default function _debugModeDrawCollisionDetectionTiles() {
    let collisionTiles = getSurroundingTiles({
        x: Player.getGlobalX(),
        y: Player.getGlobalY(),
        h: Player.getHeight(),
        w: Player.getWidth()
    },
    Player.getCollisionDetectionRadius(),
    Map.getLayer("foreground"));

    let playerVisibleX = Player.getVisibleX();
    let centerView = gameConfig.screen.viewWidth / 2;

    for(let y = 0; y < collisionTiles.length; y++) {
        for(let x = 0; x < collisionTiles[y].length; x++) {
            let tile = collisionTiles[y][x];

            if(tile != null) {

                if(playerVisibleX == centerView) {
                    PainterDebugMode.drawSquareOutline({
                        x: x*tile.getWidth() + Player.getVisibleX()- (Player.getWidth() + (Player.getGlobalX()%48)),
                        y: tile.getRow() * tile.getHeight() - tile.getHeight(),
                        w: tile.getWidth(),
                        h: tile.getHeight(),
                    },
                    "yellow");
                }
                else {
                    PainterDebugMode.drawSquareOutline({
                        // not sure why these extra calculations are needed to align properly, but they are
                        x: x*tile.getWidth() + Player.getVisibleX()- 48 - (Player.getVisibleX()%48),
                        y: tile.getRow() * tile.getHeight() - tile.getHeight(),
                        w: tile.getWidth(),
                        h: tile.getHeight(),
                    },
                    "yellow");
                }
                
            }
        }
    }
}