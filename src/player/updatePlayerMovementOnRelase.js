import Player from "./Player";

/**
 * TODO: RENAME BETTER
 * 
 * updates the players movement depending on the keyCode. If the player is moving
 * in the direction associated with the keyCode, then it stops the player from 
 * moving in such direction.
 * 
 * This is meant to be used on release of a key.
 * 
 * @param {Integer} keyCode - keyCode of key released
 */
export default function updatePlayerMovementOnRelase(keyCode) {
    // right
    if((keyCode === 68) && (Player.getHorizontalMovement() === 1)) {
        Player.setHorizontalMovement(0);
    }
    // left
    if((keyCode === 65) && (Player.getHorizontalMovement() === -1)) {
        Player.setHorizontalMovement(0);
    }
    // jump
    if(keyCode === 32) {
        Player.endJump();
    }
}