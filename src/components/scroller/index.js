import React, { Component } from 'react';
import {connect} from 'react-redux';
import Engine from './components/engine/index';
import Board from "./components/board/index";
import Map from "../../map/Map";
import Layer from "../../layer/Layer";
import gameConfig from "../../resources/config.json";
import Painter from "../../painter/Painter";
import PainterDebugMode from "../../painter/PainterDebugMode";
import DebugPanel from "./components/debugPanel/index";

import backgroundMap from "../../resources/mapBackground.json";
import foregroundMap from "../../resources/mapForeground.json";

import updatePlayerMovementOnPress from "../../player/updatePlayerMovementOnPress";
import updatePlayerMovementOnRelase from "../../player/updatePlayerMovementOnRelase";
import updatePlayerPosition from "../../player/updatePlayerPosition";

import _debugModeDrawCollisionDetectionTiles from "./utils/_debugModeDrawCollisionDetectionTiles";
import _debugModeDraw from "./utils/_debugModeDraw";
import './index.css';
import Player from '../../player/Player';

class Scroller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            canvas: null
        }

        // load background and foreground layers
        let backgroundLayer = new Layer(backgroundMap.tiles, 48, 48);
        let foregroundLayer = new Layer(foregroundMap.tiles, 48, 48);
        Map.setLayer("background", backgroundLayer);
        Map.setLayer("foreground", foregroundLayer);
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
     *      a) drawing background layer
     *      b) drawing foreground layer
     *      c) drawing items
     *      d) drawing player
     */
    onTick() {
        updatePlayerPosition();

        if(this.state.context && this.state.canvas && Painter.getSpriteSheet()) {
            this.draw();
        }

        ///////////////////////////////////////////////////
        //                                               //
        //                DEBUG MODE                     //
        //                                               //
        ///////////////////////////////////////////////////
        if(gameConfig.debugMode && PainterDebugMode.getSpriteSheet()) {
            _debugModeDrawCollisionDetectionTiles();
            // get debug panel and tell it to update
            let dp = this.refs["debugPanel"];
            dp.update();
        }
    }

    /**
     * draws the game board.
     * 
     * starts by drawing the background layer, then draws the player on top.
     */
    draw() {
        if(!gameConfig.debugMode) {
            // draw the background (sky)
            Painter.drawVisibleTilesAroundPlayer("background");

            // draw the foreground (blocks, bushes, etc...)
            Painter.drawVisibleTilesAroundPlayer("foreground");

            // draw items
            Painter.drawItemsAroundPlayer();

            // draw player
            Painter.drawPlayer();
        }
        ///////////////////////////////////////////////////
        //                                               //
        //                DEBUG MODE                     //
        //                                               //
        ///////////////////////////////////////////////////
        else {
            _debugModeDraw();
        }
        
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

        // store context and canvas in painter and debug painter
        if(this.state.context && this.state.canvas) {
            Painter.setContext(this.state.context);
            Painter.setCanvas(this.state.canvas);

            PainterDebugMode.setContext(this.state.context);
            PainterDebugMode.setCanvas(this.state.canvas);
        }

        if(!gameConfig.debugMode) {
            return (
                <div className="scroller">
                    <Engine onTick={() => this.onTick()} onKeyDown={(key) => this.onKeyDown(key)} onKeyUp={(key) => this.onKeyUp(key)}/>
                    <Board/>
                </div>
            );
        }
        
        return (
            <div className="scroller">
                <Engine onTick={() => this.onTick()} onKeyDown={(key) => this.onKeyDown(key)} onKeyUp={(key) => this.onKeyUp(key)}/>
                <Board/>
                <DebugPanel ref={"debugPanel"} />
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