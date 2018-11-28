import gameConfig from "../resources/config.json";
import Map from "../map/Map";
import getSurroundingTiles from "../utils/getSurroundingTiles";
import collides2 from "../utils/collisionDetection/collides2";

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

    /**
     * moves the player either left or right distance
     * if distance is negative, moves left, o/w moves right
     * @param {Integer} distance - the distance to move the player
     */
    moveHorizontally(distance) {
        this._moveHorizontallyGlobally(distance);
        this._moveHorizontallyVisibily();
    } 

    moveVertically(distance) {
        this._moveVerticallyGlobally(distance);
        this._moveVerticallyVisibly();
    }

    /**
     * private method, sets the global y position of the player
     * @param {Integer} distance - the distance the player is moving vertically 
     */
    _moveVerticallyGlobally(distance) {
        let globalY = this.getGlobalY();
        let newY = globalY + distance;
        let mapMaxHeight = (gameConfig.map.numRows -1) * gameConfig.map.tiles.height;
        let playerRadius = this.getCollisionDetectionRadius();
        let layer = Map.getLayer("background");
        let surroundingTiles;
        let playerObj = {
            x: this.getGlobalX(),
            y: null,
            w: this.getWidth(),
            h: this.getHeight()
        };

        if(newY <= 0) { 
            playerObj.y = 0;
        }
        // todo, update for when falling off map possibly
        else if(newY >= mapMaxHeight) {
            playerObj.y = mapMaxHeight;
        }
        else {
            playerObj.y = newY;
        }

        surroundingTiles = getSurroundingTiles(playerObj, playerRadius, layer);

        let collisionTile = collides2(playerObj, surroundingTiles);
        // if there are no collisions with the player and the intended movement, then upda
        if(!collisionTile) {
            this.setGlobalY(playerObj.y);
        } 
        // collision
        else {
            // align the player on proper side of block depending on their direction
            (distance < 0) ? this.setGlobalY(collisionTile.getY() + collisionTile.getHeight()): this.setGlobalY(collisionTile.getY() - this.getHeight());
        }
    }

    _moveVerticallyVisibly() {
        let globalY = this.getGlobalY();
        let mapMaxHeight = (gameConfig.map.numRows) * gameConfig.map.tiles.height;
        let centerView = gameConfig.screen.viewHeight / 2;

        console.log("Global y: " + globalY);
        console.log("CenterView: " + centerView);
        console.log("map max height: " + mapMaxHeight);

        // player is above half of screen
        if(globalY <= centerView) {
            this.setVisibleY(globalY);
        }
        // player is below half of screen
        else if(globalY >= (mapMaxHeight - centerView)) {
            let distanceFromBottomOfScreen = mapMaxHeight - globalY;
            let visibleY = gameConfig.screen.viewHeight - distanceFromBottomOfScreen;
            this.setVisibleY(visibleY);
        }
        // player is centered vertically in screen
        else {
            this.setVisibleY(centerView);
        }
    }

    /**
     * private method, that sets the global x value of the player.
     * @param {Integer} distance - distance player is trying to move
     */
    _moveHorizontallyGlobally(distance) {
        let globalX = this.getGlobalX();
        let newX = globalX + distance;
        let mapMaxWidth = (gameConfig.map.numCols - 1) * gameConfig.map.tiles.width;
        let playerRadius = this.getCollisionDetectionRadius();
        let layer = Map.getLayer("background");
        let surroundingTiles;
        let playerObj = {
            x: null,
            y: this.getGlobalY(),
            w: this.getWidth(),
            h: this.getHeight()
        };

        if(newX <= 0) { 
            playerObj.x = 0;
        }
        else if(newX >= mapMaxWidth) {
            playerObj.x = mapMaxWidth;
        }
        else {
            playerObj.x = newX;
        }

        surroundingTiles = getSurroundingTiles(playerObj, playerRadius, layer);

        let collisionTile = collides2(playerObj,surroundingTiles);
        // if there are no collisions with the player and the intended movement, then upda
        if(!collisionTile) {
            this.setGlobalX(playerObj.x);
        } 
        // collision
        else {
            // align the player on proper side of block depending on their direction
            (distance < 0) ? this.setGlobalX(collisionTile.getX() + this.getWidth()): this.setGlobalX(collisionTile.getX() - this.getWidth());
        }
    }

    /**
     * private method, that sets the visible x value of the player
     */
    _moveHorizontallyVisibily() {
        let globalX = this.getGlobalX();
        let mapMaxWidth = (gameConfig.map.numCols) * gameConfig.map.tiles.width;
        let centerView = gameConfig.screen.viewWidth / 2;

        // start of map, player may not be in center of screen
        if(globalX <= centerView) {
            this.setVisibleX(globalX);
        }
        // end of map, player may be past center of screen
        else if(globalX >= (mapMaxWidth - centerView)) {
            let distanceFromEndOfScreen = mapMaxWidth - globalX;
            let visibleX = gameConfig.screen.viewWidth - distanceFromEndOfScreen;
            this.setVisibleX(visibleX);
        }
        // player is centered in screen
        else {
            this.setVisibleX(centerView);
        }
    }
}

export default new Player();