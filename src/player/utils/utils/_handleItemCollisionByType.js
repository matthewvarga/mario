import Player from "../../Player";
import Items from "../../../items/Items";

export default function _handleItemCollisionByType(item, itemCol, itemRow) {
    
        switch(item.getType()) {
            case "COIN":
                console.log("collided with a coin");
                Player.updateScore(item.getValue());
                console.log("players score: " + Player.getScore());
                Items.deleteItem(itemCol, itemRow);
                break;
            case "?":
                break;
            default:
                break;
        }

}