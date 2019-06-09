import gameConfig from "../resources/config.json";
import _moveVerticallyGlobally from "./_moveVerticallyGlobally";
import _moveVerticallyVisibly from "./_moveVerticallyVisibly";
import _moveHorizontallyGlobally from "./_moveHorizontallyGlobally";
import _moveHorizontallyVisibily from "./_moveHorizontallyVisibily";
import _checkTileTypesBelowPlayer from "./_checkTilesStateBelowPlayer";

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

}

export default new Coin();