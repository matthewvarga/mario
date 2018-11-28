import collides from "./collides";

//TODO rename
export default function collides2(obj1, tileSection) {

    for(let y = 0; y < tileSection.length; y++) {
        for(let x = 0; x < tileSection[y].length; x++) {
            let tile = tileSection[y][x];

            let tileObj = {
                x: tile.getX(),
                y: tile.getY(),
                w: tile.getWidth(),
                h: tile.getHeight()
            }


            if(collides(obj1, tileObj) && tile.getType() === "SOLID") {
                return tile
            };

        }
    }
    return false;
}