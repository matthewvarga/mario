import gameConfig from "../config.json";
import Map from "../map/Map";
import Painter from "../painter/Painter";

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

    _getSurroundingTilesForCollision(x, y) {
        let playerCol = Math.floor(x / this.getWidth());
        let playerRow = Math.floor(y / this.getHeight());

        let layer = Map.getLayer("background");

        let section;

        // player on first col
        if(playerCol == 0){
            section = layer.getSection(playerCol, playerCol+2, playerRow-1, playerRow+2);
        }
        // player on last col
        else if(playerCol == (gameConfig.map.numCols -2)) {
            section = layer.getSection(playerCol-1, playerCol+1, playerRow-1, playerRow+2)
        }
        // player somewhere in between
        else {
            section = layer.getSection(playerCol-1, playerCol+2, playerRow-1, playerRow+2);
        }
        return section;
    }

    // https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
    _collsionWithSurroundingTiles(surroundingTiles, xCoord, yCoord) {

        let collision = false;
        //console.log("ax1: " + xCoord);
        for(let y = 0; y < surroundingTiles.length; y++) {
            for(let x = 0; x < surroundingTiles[y].length; x++) {
                

                if(surroundingTiles[y][x].type == "SOLID") {
                    let ax1 = xCoord;
                    let bx2 = surroundingTiles[y][x].col * 48;
                    let ax2 = ax1 + 48;
                    let bx1 = bx2 - 48;
                    let ay1 = yCoord;
                    let by2 = surroundingTiles[y][x].row * 48;
                    let ay2 = ay1 + 48;
                    let by1 = by2 - 48;
                    
                    collision = ((ax1 < bx2) && (ax2 > bx1) && (ay1 < by2) && (ay2 > by1));
                    if(collision) {
                        console.log("collision");
                        return true
                    }
                }
                
            }
        }

        return collision;
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

        let surTiles;

        if(newX <= 0) { 
            surTiles = this._getSurroundingTilesForCollision(0, this.getGlobalY());
            if(!this._collsionWithSurroundingTiles(surTiles, 0, this.getGlobalY())) {
                this.setGlobalX(0);
            }
        }
        else if(newX >= mapMaxWidth) {
            surTiles = this._getSurroundingTilesForCollision(mapMaxWidth, this.getGlobalY());
            if(!this._collsionWithSurroundingTiles(surTiles, mapMaxWidth, this.getGlobalY())) {
                this.setGlobalX(mapMaxWidth);
            }
        }
        else {
            surTiles = this._getSurroundingTilesForCollision(newX, this.getGlobalY());
            if(!this._collsionWithSurroundingTiles(surTiles, newX, this.getGlobalY())) {
                this.setGlobalX(newX);
            }
        }
    }

    /**
     * private method, that sets the visible x value of the player
     */
    _moveHorizontallyVisibily() {
        let globalX = this.getGlobalX();
        let mapMaxWidth = (gameConfig.map.numCols) * gameConfig.map.tiles.width;
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