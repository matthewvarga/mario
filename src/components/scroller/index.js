import React, { Component } from 'react';
import {connect} from 'react-redux';
import Engine from './components/engine/index';
import Board from "./components/board/index";
import Map from "../../map/Map";
import Layer from "../../layer/Layer";
import gameConfig from "../../resources/config.json";
import Painter from "../../painter/Painter";
import PainterDebugMode from "../../painter/PainterDebugMode";

import getSurroundingTiles from "../../utils/getSurroundingTiles";
import Player from "../../player/Player";

import backgroundMap from "../../resources/mapBackground.json";
import foregroundMap from "../../resources/mapForeground.json";

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

        // load background and foreground
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
     */
    onTick() {
        updatePlayerPosition();

        if(this.state.context && this.state.canvas && Painter.getSpriteSheet() && PainterDebugMode.getSpriteSheet()) {
            this.draw();
        }

        ///////////////////////////////////////////////////
        //                                               //
        //                DEBUG MODE                     //
        //                                               //
        ///////////////////////////////////////////////////
        // draws yellow outline around surrounding tiles used to check for collision with the player
        // needs to be done here instead of in collision checking, as that is done before the map is
        // drawn, so the oulines would be drawn over.
        // still a little glitchy and could use some work.
        if(gameConfig.debugMode && PainterDebugMode.getSpriteSheet()) {
            let collisionTiles = getSurroundingTiles({
                x: Player.getGlobalX(),
                y: Player.getGlobalY(),
                h: Player.getHeight(),
                w: Player.getWidth()
            },
            Player.getCollisionDetectionRadius(),
            Map.getLayer("foreground"));

            for(let y = 0; y < collisionTiles.length; y++) {
                for(let x = 0; x < collisionTiles[y].length; x++) {
                    let tile = collisionTiles[y][x];

                    if(tile != null) {
                        PainterDebugMode.drawSquareOutline({
                            // not sure why these extra calculations are needed to align properly, but they are
                            x: x*tile.getWidth() + Player.getVisibleX()- 48 - (Player.getVisibleX()%48),
                            y: y*tile.getHeight() + Player.getGlobalY() - 48,
                            w: tile.getWidth(),
                            h: tile.getHeight(),
                        },
                        "yellow");
                    }
                }
            }
        }
    }

    /**
     * draws the game board.
     * 
     * starts by drawing the background layer, then draws the player on top.
     */
    draw() {
        ///////////////////////////////////////////////////
        //                                               //
        //                DEBUG MODE                     //
        //                                               //
        ///////////////////////////////////////////////////
        if(gameConfig.debugMode) {
            // draw the background (sky)
            PainterDebugMode.drawVisibleTilesAroundPlayer("background");
            // draw the foreground (blocks, bushes, etc...)
            PainterDebugMode.drawVisibleTilesAroundPlayer("foreground");
            PainterDebugMode.drawPlayer();
        }
        else {
            // draw the background (sky)
            Painter.drawVisibleTilesAroundPlayer("background");
            // draw the foreground (blocks, bushes, etc...)
            Painter.drawVisibleTilesAroundPlayer("foreground");
            Painter.drawPlayer();
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