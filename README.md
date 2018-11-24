# Mario

## About
This is a recreation of the original Super Mario Bros built as a modern web app. It is a project I am doing for fun, and as a learning experience. 

**_Note:_** I do not own any of the resources used for this, such as the sprites.

## Running
To run the application, clone the repo and rename the folder from mario to "scroller" (I may resolve this issue someday, but am too lazy right now). Then run npm start from the scroller directory. This requires create-react-app to be installed.

## How it works
### Components
This entire application can be built without using react / redux, and using vanilla javascript instead. however, as this is a hobby for fun and elarning, I figured it'd be fun to use.

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

``getSection(startCol, endCol, startRow, endRow)`` - this method allows you to retrieve only a portion of the layers tiles, restricted within the box that is defined by the startCol, endCol, startRow, and endRow. This is particularily important, because it allows for only the visible section of the layer to be selected, making it much easier for when we want to paint only visible content.

