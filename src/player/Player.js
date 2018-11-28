import gameConfig from "../resources/config.json";
import _moveVerticallyGlobally from "./_moveVerticallyGlobally";
import _moveVerticallyVisibly from "./_moveVerticallyVisibly";
import _moveHorizontallyGlobally from "./_moveHorizontallyGlobally";
import _moveHorizontallyVisibily from "./_moveHorizontallyVisibily";

class Player {

    constructor(){
        this._width = gameConfig.player.width;
        this._height = gameConfig.player.height;

        // coordinate on the screen
        this._visibleX = gameConfig.player.startPosition.x;
        this._visibleY = gameConfig.player.startPosition.y;

        // coordinate on the map
        this._globalX = gameConfig.player.startPosition.x;
        this._globalY = gameConfig.player.startPosition.y;

        // collision detection radius
        this._collisionDetectionRadius = gameConfig.player.collisionDetectionRadius;

        this._velocityX = gameConfig.player.velocityX;
        this._velocityY = gameConfig.player.velocityY;
        this._gravity = gameConfig.player.gravity;
        this._jumpVelocity = gameConfig.player.jumpVelocity;
        this._reducedJumpVelocity = gameConfig.player.reducedJumpVelocity;
        this._horizontalMovement = 0; // 1 = right, -1 = left, 0 = none
        this._verticalMovement = 0; // 1 = up, -1 = down, 0 = none
    }

    /**
     * returns the width of the player
     */
    getWidth() {
        return this._width;
    }

    /**
     * returns the width of the player
     */
    getHeight() {
        return this._height;
    }

    getVisibleX() {
        return this._visibleX;
    }

    setVisibleX(x) {
        this._visibleX = x;
    }

    getVisibleY() {
        return this._visibleY;
    }

    setVisibleY(y) {
        this._visibleY = y;
    }

    getGlobalX() {
        return this._globalX;
    }

    setGlobalX(x) {
        this._globalX = x;
    }

    getGlobalY() {
        return this._globalY;
    }

    setGlobalY(y) {
        this._globalY = y;
    }

    getCollisionDetectionRadius() {
        return this._collisionDetectionRadius;
    }

    getVelocityX() {
        return this._velocityX;
    }

    setVelocityX(v) {
        this._velocityX = v;
    }

    getVelocityY() {
        return this._velocityY;
    }

    setVelocityY(v) {
        this._velocityY = v;
    }

    getHorizontalMovement() {
        return this._horizontalMovement;
    }

    setHorizontalMovement(movement) {
        this._horizontalMovement = movement;
    }

    getVerticalMovement() {
        return this._verticalMovement;
    }

    setVerticalMovement(movement) {
        this._verticalMovement = movement;
    }

    getGravity() {
        return this._gravity;
    }

    getJumpVelocity() {
        return this._jumpVelocity;
    }

    getReducedJumpVelocity() {
        return this._reducedJumpVelocity;
    }

    /**
     * initiates a jump, and sets y velocity to be high.
     */
    startJump() {
        if(this.getVelocityY() == 0) {
            this.setVelocityY(this.getJumpVelocity());
        }
    }

    /**
     * slows and limits player y velocity when jumping.
     */
    endJump() {
        if(this.getVelocityY() < this.getReducedJumpVelocity()) {
            this.setVelocityY(this.getReducedJumpVelocity());
        }
    }

    /**
     * moves the player either left or right distance
     * if distance is negative, moves left, o/w moves right
     * @param {Integer} distance - the distance to move the player
     */
    moveHorizontally(distance) {
        _moveHorizontallyGlobally(distance);
        _moveHorizontallyVisibily();
    } 

    moveVertically() {
        _moveVerticallyGlobally();
        _moveVerticallyVisibly();
    }
}

export default new Player();