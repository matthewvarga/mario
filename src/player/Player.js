import gameVals from "../components/scroller/config.json";

class Player {

    constructor(){
        // column the player top left corner is on
        this._x = 96;
        this._y = 336;

        // coordinate on the screen
        this._visibleX = 96;
        this._visibleY = 336;

        // coordinate on the map
        this._globalX = 96;
        this._globalY= 336;
        
        this._width = 48;
        this._height = 48;

        this.speed = 1;
    }

    /**
     * returns the width of the player
     */
    getWidth() {
        return this._width;
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
        let gameMaxWidth = (gameVals.mapWidth - 1) * gameVals.tileWidth;

        if(newX <= 0) { 
            this.setGlobalX(0)
        }
        else if(newX >= (gameMaxWidth - this.getWidth())) {
            this.setGlobalX(gameMaxWidth - this.getWidth());
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
        let gameMaxWidth = (gameVals.mapWidth-1) * gameVals.tileWidth;
        let centerView = gameVals.viewWidth / 2;

        if(globalX <= centerView) {
            this.setVisibleX(globalX);
        }
        else if(globalX >= (gameMaxWidth - centerView)) {
            let distanceFromEndOfScreen = gameMaxWidth - globalX;
            let visibleX = gameVals.viewWidth - distanceFromEndOfScreen;
            this.setVisibleX(visibleX);
        }
        else {
            this.setVisibleX(centerView);
        }
    }
}

export default new Player();