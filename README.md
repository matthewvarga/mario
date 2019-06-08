# Mario

This project is a recreation of the original Super Mario Bros built as a modern web app. It is a project I am doing for fun.

**_Note:_** I do not own the assets (i.e. sprites).

## How it Works

### Configuration

The game settings are configured in `resources/config.json`. 

#### Screen
The `screen` is the viewable game canvas, and the `bufferCols` is the number of buffer columns to be drawn. 

A `buffer column` is a column that is loaded to the left and right of the minimum number of visible columns within the screen.

__For example__: If the screen size is 30x30 pixels, and a tile is 3x3 pixels, then the screen would be filled with 10x10 tiles. 

Now if you try to move right, what is actually happening is the background is moving left. 

So lets say the player moves 2 pixels to the right. Then the 10x10 tiles that were visible would all move 2 pixels to the left. So now the first column of visible tiles is overflowing 2 pixels off the left (invisible), and there is an empty gap of 2 pixels in the last column.

This is why a buffer column is used and is drawn off the screen, so when a player moves, it is shifted on screen, and there is no amount of empty space on either side. 

#### Map

The `Map` configuration is where you define how large the game map is, by indicating how big each `tile` is, and then how many `rows` and `columns` of tiles there are in the entire map.

#### Player

the `Player` configuration is where you d

**_Note:_** I do not own any of the resources used for this, such as the sprites.

## Running
To run the application, clone the repo and rename the folder from mario to "scroller" (I may resolve this issue someday, but am too lazy right now). Then run `npm start` from the scroller directory. This requires create-react-app to be installed.

## How it works
### Components
This entire application can be built without using react / redux, and using vanilla javascript instead. However, as this is a hobby for fun and learning, I figured it'd be fun to use.

#### Scroller
The scroller component is really the piece that puts everything together. It listens for game ticks and keyboard strokes, and updates players / npcs accordingly. 

#### Engine
The "engine" if you should call it that, is responible for producing each game "tick" and propogating to the callback function that a tick has occured. It is also what listenes for keyboard input, and again propogates it to any listening methods.  

#### Board
The board is very simply the HTML cavnas element. However, upon mount, it sends a pointer to the canvas itself, and its 2d context into the redux store.

### Classes
the application contains a couple different classes.

#### Map
The map class is a very simple one, with the sole purpose of storing and providing easy access to each layer. An example of layers could be background (any scenery that does not interact with anything), solids (any solid blocks), player, coins, etc...

#### Layer
The layer class is also a very simple one, used to store an individual layer. However, it does have one interesting feature that becomes very useful.

### SpriteSheet
The spritesheet is composed of 33 columns (32 if counting from 0), and 28 rows (27 if counting form 0).
Each sprite is 48x48 pixels.

each sprite has a unique integer value, which is calculated as follows:
(we will be using the top right of a pipe for an example calculation).

1) Find the row the sprite is in (starting from 0).
2) Multiply it by the number of columns within the sheet.
3) Find the column the sprite is in (starting from 0).
4) Add the column to the product previously calculated.

The result is the unique identifier for the sprite.

Example: The top right pipe.
1) 8
2) 8x32 = 256
3) 1
4) 256 + 1 = 257
==> sprite value for top right pipe is 257.

#### Sprite
Understanding a sprite value.

``getSection(startCol, endCol, startRow, endRow)`` - this method allows you to retrieve only a portion of the layers tiles, restricted within the box that is defined by the startCol, endCol, startRow, and endRow. This is particularily important, because it allows for only the visible section of the layer to be selected, making it much easier for when we want to paint only visible content.

