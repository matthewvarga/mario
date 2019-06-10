import Player from "../../Player";
import Items from "../../../items/Items";

export default function _handleItemCollisionByType(item, itemCol, itemRow) {
    
        switch(item.getType()) {
            case "COIN":
                Player.updateScore(item.getValue());
                Items.deleteItem(itemCol, itemRow);
                break;
            case "?":
                break;
            default:
                break;
        }

}