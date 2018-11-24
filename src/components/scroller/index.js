import React, { Component } from 'react';
import {connect} from 'react-redux';
import Engine from './components/engine/index';
import Board from "./components/board/index";
import Map from "../../map/Map";
import Layer from "../../layer/Layer";
import Painter from "../../painter/Painter";
import testMap from "./testMap.json";
import Player from "../../player/Player";
import './index.css';

class Scroller extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            canvas: null
        }

        let backgroundLayer = new Layer(testMap.map.tiles, testMap.map.tileWidth, testMap.map.tileHeight);
        //console.log("context: " + this.context);
        Map.setLayer("background", backgroundLayer);
        console.log("CONSTRUCTOR");
        
    }

    componentDidMount(){
        console.log("scroller mount");
        console.log(this.context);
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
        //console.log("tick");
        
    }

    draw() {
        Painter.drawVisibleTilesAroundPlayer("background");
        Painter.drawPlayer();
        
    }

    // gets called whenever a key is pressed
    onKeyDown(keyCode) {
        console.log("key: " + keyCode);

        // move right
        if(keyCode === 68) {
            Player.moveHorizontally(10);
            this.draw();
        }
        // move left
        if(keyCode === 65) {
            Player.moveHorizontally(-10);
            this.draw();
        }
    }

    render() {

        if(this.state.context && this.state.canvas) {
            Painter.setContext(this.state.context);
            Painter.setCanvas(this.state.canvas);
        }

        return (
            <div className="scroller">
                <Engine onTick={() => this.onTick()} onKeyDown={(key) => this.onKeyDown(key)}/>
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