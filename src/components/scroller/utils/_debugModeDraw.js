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
export default function _debugModeDraw() {
    // draw the background (sky)
    PainterDebugMode.drawVisibleTilesAroundPlayer("background");

    // draw the foreground (blocks, bushes, etc...)
    PainterDebugMode.drawVisibleTilesAroundPlayer("foreground");

    // draw items
    PainterDebugMode.drawItemsAroundPlayer();

    // draw player
    PainterDebugMode.drawPlayer();
}