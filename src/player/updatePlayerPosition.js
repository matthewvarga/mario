import Player from "./Player";

/**
 * updates the players horizontal postion if they have moved horizontally.
 * 
 * @param {Integer} direction - direction player has moved (1 = right, -1 = left, 0 = has not moved)
 */
function _updatePlayerHorizontalPosition(direction) {
    switch(direction) {
        case 1: // right
            Player.moveHorizontally(Player.getVelocityX());
            break;
        case -1: // left
            Player.moveHorizontally(-1 * Player.getVelocityX());
            break;
        default:
            break;
    }
}

/**
 * updates the players vertical postion if they have moved vertically.
 * 
 * @param {Integer} direction - direction player has moved (1 = right, -1 = left, 0 = has not moved)
 */
function _updatePlayerVerticalPosition(direction) {
    switch(direction) {
        case -1: // up
            Player.moveVertically(-1 * Player.getVelocityY());
            break;
        case 1: // down
            Player.moveVertically(Player.getVelocityY());
            break;
        default: // gravity applied by default 
            Player.moveVertically(Player.getGravity());
    }
}

/**
 * Updates the players position absed on their movement.
 */
export default function updatePlayerPosition() {
    _updatePlayerHorizontalPosition(Player.getHorizontalMovement());
    _updatePlayerVerticalPosition(Player.getVerticalMovement());
}