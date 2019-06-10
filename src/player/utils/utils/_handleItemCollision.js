import Player from "../../Player";
import Items from "../../../items/Items";
import collides from "../../../utils/collisionDetection/collides";
import _handleItemCollisionByType from "./_handleItemCollisionByType";
import gameConfig from "../../../resources/config.json";

export default function _handleItemCollision() {
    let playerColL = Math.floor(Player.getGlobalX()/gameConfig.map.tiles.width);
    let playerColR = Math.ceil(Player.getGlobalX()/gameConfig.map.tiles.width);

    let playerRowT = Math.floor(Player.getGlobalY()/gameConfig.map.tiles.height);
    let playerRowB = playerRowT + Player.getHeight();


    if(Items.getNumItems()) {
        for(let c = playerColL; c <= playerColR; c++) {
            for(let r = playerRowT; r <= playerRowB; r++) {

                let item = Items.getItem(c+1, r+1); // need to add 1 to each, because items count startin from 1
                
                // if an item exists on the tile, check if player actually collides with its hitbox or not
                if(item) {
                    let playerObj = {
                        x: Player.getGlobalX(),
                        y: Player.getGlobalY(),
                        w: Player.getWidth(),
                        h: Player.getHeight()
                    }

                    let itemObj = {
                        x: item.getHitboxX(),
                        y: item.getHitboxY(),
                        w: item.getHitboxWidth(),
                        h: item.getHitboxHeight()
                    }

                    let collision = collides(playerObj, itemObj);
                
                    if(collision) {
                        _handleItemCollisionByType(item, c+1, r+1);
                    }
                }
            }
        }
    }
}