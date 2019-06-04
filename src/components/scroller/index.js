import React, { Component } from 'react';
import {connect} from 'react-redux';
import Engine from './components/engine/index';
import Board from "./components/board/index";
import Map from "../../map/Map";
import Layer from "../../layer/Layer";
import Painter from "../../painter/Painter";
import gameMap from "../../resources/map.json";
import updatePlayerMovementOnPress from "../../player/updatePlayerMovementOnPress";
import updatePlayerMovementOnRelase from "../../player/updatePlayerMovementOnRelase";
import updatePlayerPosition from "../../player/updatePlayerPosition";
import './index.css';

class Scroller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            canvas: null
        }

        let backgroundLayer = new Layer(gameMap.tiles, 48, 48);
        Map.setLayer("background", backgroundLayer);
    }

    // set context when store gets updated
    componentWillReceiveProps(nextProps) {
        if((this.state.context !== nextProps.context && nextProps.context !== null) && (this.state.canvas !== nextProps.canvas && nextProps.canvas !== null)) {
            this.setState({
                context: nextProps.context,
                canvas: nextProps.canvas
            });
        }
    }

    /**
     * called on every game tick. Performs the following actions:
     * 
     * 1) updates players position
     * 2) updates canvas
     */
    onTick() {
        updatePlayerPosition();
        
        if(this.state.context && this.state.canvas && Painter.getSpriteSheet()) {
            this.draw();
        }
        
    }

    /**
     * draws the game board.
     * 
     * starts by drawing the background layer, then draws the player on top.
     */
    draw() {
        Painter.drawVisibleTilesAroundPlayer("background");
        Painter.drawPlayer();
    }

    /**
     * key press listener. Updates players movement based on the key pressed.
     * 
     * @param {int} keyCode - key pressed
     */
    onKeyDown(keyCode) {
        updatePlayerMovementOnPress(keyCode);
    }

    /**
     * key release listner. Updates players movement based on key released.
     * 
     * @param {int} keyCode - ey released
     */
    onKeyUp(keyCode) {
        updatePlayerMovementOnRelase(keyCode);
    }

    render() {

        if(this.state.context && this.state.canvas) {
            Painter.setContext(this.state.context);
            Painter.setCanvas(this.state.canvas);
        }

        return (
            <div className="scroller">
                <Engine onTick={() => this.onTick()} onKeyDown={(key) => this.onKeyDown(key)} onKeyUp={(key) => this.onKeyUp(key)}/>
                <Board/>
            </div>
        );
    }
}

// redux, provide access to store canvas and context and store in props
function mapStateToProps(state) {
    return {
        canvas: state.canvas.data,
        context: state.context.data
    };
}

export default connect(mapStateToProps)(Scroller);