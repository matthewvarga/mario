import React, { Component } from 'react';
import './index.css';
import Player from '../../../../player/Player';

class DebugPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerHorizontalVelocity: 0,
            playerVerticalVelocity: 0,
            playerGlobalX: 0,
            playerGlobalY: 0,
            FPS: 0
        }

        this.framesCounter = 0;
        

    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let temp = this.framesCounter;
            this.framesCounter = 0;
            this.setState({
                FPS: temp
            });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        console.log(Player.getVelocityX());
        this.framesCounter += 1;
        this.setState((prevState, props) => ({
            playerHorizontalVelocity: Player.getVelocityX(),
            playerVerticalVelocity: Player.getVelocityY(),
            playerGlobalX: Player.getGlobalX(),
            playerGlobalY: Player.getGlobalY()
        }))
    }

    render() {
        return (
            <div className={"debug-panel"}>
                <h1 className={"debug-heading"}>Degub Info</h1>
                <div className={"debug-row"}>
                    <h3 className={"debug-title"}> Player Horizontal Velocity: </h3>
                    <p className={"debug-value"}>{this.state.playerHorizontalVelocity}</p>
                </div>
                <div className={"debug-row"}>
                    <h3 className={"debug-title"}> Player Vertical Velocity: </h3>
                    <p className={"debug-value"}>{this.state.playerVerticalVelocity}</p>
                </div>
                <div className={"debug-row"}>
                    <h3 className={"debug-title"}> Player Global (x, y): </h3>
                    <p className={"debug-value"}>({this.state.playerGlobalX}, {this.state.playerGlobalY})</p>
                </div>
                <div className={"debug-row"}>
                    <h3 className={"debug-title"}> FPS: </h3>
                    <p className={"debug-value"}>{this.state.FPS}</p>
                </div>
            </div>
        );
    }
}
export default DebugPanel;