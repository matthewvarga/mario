import Player from "./Player";

/**
 * Sets the players movement according to the keycode passed in. This is inteded
 * to be caleld on keydown.
 * 
 * @param {*} keyCode 
 */
export default function updatePlayerMovement(keyCode) {
    switch(keyCode) {
        case 68: // right
            Player.setHorizontalMovement(1);
            break;
        case 65: // left
            Player.setHorizontalMovement(-1);
            break;
        case 32: // jump
            Player.startJump();
            break;
        default:
            break;
    }
}