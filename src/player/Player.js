class Player {

    constructor(){
        // column the player top left corner is on
        this._leftCol = 1;
        this._offset = 0; // pixel offset from column

        this._width = 48;
        this._height = 48;

        this.speed = 1;
    }

    getWidth() {
        return this._width;
    }

    getLeftCol() {
        return this._leftCol;
    }

    setLeftCol(col) {
        this._leftCol = col;
    }

    getOffset() {
        return this._offset;
    }

    setOffset(offset) {
        console.log("setting offset to: " + offset);
        this._offset = offset;
    }

    move(distance) {
        let offset = this.getOffset() + distance;
        let w = this.getWidth();

        console.log("distance: " + distance);
        console.log("offset: " + offset);

        if(offset >= w || (-1)*offset >= w) {
            let colOffset = Math.floor(offset/w);

            console.log("coloffset: " + colOffset);
            this.setLeftCol(this.getLeftCol() + colOffset);
            this.setOffset(offset - colOffset*w);
        }
        else {
            this.setOffset(offset);
        }
        
    } 
}

export default new Player();