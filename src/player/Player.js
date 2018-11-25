import gameConfig from "../config.json";

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

    setvisibleY(y) {
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

    /**
     * moves the player either left or right distance
     * if distance is negative, moves left, o/w moves right
     * @param {Integer} distance - the distance to move the player
     */
    moveHorizontally(distance) {
        this._moveHorizontallyGlobally(distance);
        this._moveHorizontallyVisibily();
    } 

    /**
     * private method, that sets the global x value of the player.
     * @param {Integer} distance - distance player is trying to move
     */
    _moveHorizontallyGlobally(distance) {
        let globalX = this.getGlobalX();
        let newX = globalX + distance;
        let mapMaxWidth = (gameConfig.map.numCols - 1) * gameConfig.map.tiles.width;

        if(newX <= 0) { 
            this.setGlobalX(0)
        }
        else if(newX >= (mapMaxWidth - this.getWidth())) {
            this.setGlobalX(mapMaxWidth - this.getWidth());
        }
        else {
            this.setGlobalX(newX);
        }
    }

    /**
     * private method, that sets the visible x value of the player
     */
    _moveHorizontallyVisibily() {
        let globalX = this.getGlobalX();
        let mapMaxWidth = (gameConfig.map.numCols - 1) * gameConfig.map.tiles.width;
        let centerView = gameConfig.screen.viewWidth / 2;

        if(globalX <= centerView) {
            this.setVisibleX(globalX);
        }
        else if(globalX >= (mapMaxWidth - centerView)) {
            let distanceFromEndOfScreen = mapMaxWidth - globalX;
            let visibleX = gameConfig.screen.viewWidth - distanceFromEndOfScreen;
            this.setVisibleX(visibleX);
        }
        else {
            this.setVisibleX(centerView);
        }
    }
}

export default new Player();