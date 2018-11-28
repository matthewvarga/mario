import React, { Component } from 'react';
import {connect} from 'react-redux';
import Engine from './components/engine/index';
import Board from "./components/board/index";
import Map from "../../map/Map";
import Layer from "../../layer/Layer";
import Painter from "../../painter/Painter";
import gameMap from "../../resources/map.json";
import updatePlayerMovement from "../../player/updatePlayerMovement";
import updatePlayerMovement2 from "../../player/updatePlayerMovement2";
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

    // gets called for every game tick
    onTick() {
        updatePlayerPosition();
        
        if(this.state.context && this.state.canvas && Painter.getSpriteSheet()) {
            this.draw();
        }
        
    }

    draw() {
        Painter.drawVisibleTilesAroundPlayer("background");
        Painter.drawPlayer();
    }

    onKeyDown(keyCode) {
        updatePlayerMovement(keyCode);
        console.log(keyCode);
    }

    onKeyUp(keyCode) {
        updatePlayerMovement2(keyCode);
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