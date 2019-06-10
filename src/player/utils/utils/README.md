# Item Collision

Item collision is taken care of by `_handleItemCollision`.

It checks the tiles that the player is currently in, and then checks if there are any items within those tiles.
If an item is within one of the tiles, it then checks if the player is colliding with the items hitbox. 

If an item is colliding with a player, `_handleItemCollisionByType` then determines what to do based on the type of the item.