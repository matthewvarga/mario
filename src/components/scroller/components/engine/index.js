import React, { Component } from 'react';
import Painter from "../../../../painter/Painter";
import PainterDebugMode from "../../../../painter/PainterDebugMode";
import sprites from "../../../../resources/sprites.png";

class Engine extends Component {

    constructor(props) {
        super(props);

        
        this.tick();
        
    }

    /**
     * Load spritesheets into both painter, and debug painter
     */
    loadSpriteSheet() {
        let image = new Image();
        image.onload = function() {
            Painter.setSpriteSheet(image);
            PainterDebugMode.setSpriteSheet(image);
        }
        image.src=sprites;
    }
    
    componentDidMount() {
        // add event listener for key presses, and emit to listener methods the keycode
        // a = 65, w=87, d=68, s=83, space=32
        document.addEventListener('keydown', (e) => {
            this.props.onKeyDown((e.keyCode));
        });
        document.addEventListener('keyup', (e) => {
            this.props.onKeyUp((e.keyCode));
        });
        this.loadSpriteSheet();
    }

    // emit to listener methods that a tick has occured
    tick() {
        this.props.onTick();
        window.requestAnimationFrame(() => this.tick());
    }

    render() {
        return null
    }
}


export default Engine;