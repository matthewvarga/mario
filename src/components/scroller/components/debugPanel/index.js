import React, { Component } from 'react';
import './index.css';
import Player from '../../../../player/Player';

class DebugPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerHorizontalDirection: "None",
            playerVerticalDirection: "None",
            playerHorizontalVelocity: 0,
            playerVerticalVelocity: 0,
            playerGlobalX: 0,
            playerGlobalY: 0,
            FPS: 0
        }

        this.framesCounter = 0;
        

    }

    // visually display how many frames were drawn in the last second
    componentDidMount() {
        this.interval = setInterval(() => {
            let temp = this.framesCounter;
            this.framesCounter = 0;
            this.setState({
                FPS: temp
            });
        }, 1000)
    }

    // clear interval for updating frames
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        console.log(Player.getVelocityX());
        this.framesCounter += 1;
        this.setState((prevState, props) => ({
            playerHorizontalDirection: (prevState.playerGlobalX - Player.getGlobalX()) != 0 ? ((prevState.playerGlobalX - Player.getGlobalX()) > 0 ? "Left" : "Right") : "None",
            playerVerticalDirection: (prevState.playerGlobalY - Player.getGlobalY()) != 0 ? ((prevState.playerGlobalY - Player.getGlobalY()) > 0 ? "Up" : "Down") : "None",
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

                <h2 className={"debug-section-title"}> General</h2>
                <div className={"debug-section"}>
                    <div className={"debug-row"}>
                        <h3 className={"debug-title"}> FPS: </h3>
                        <p className={"debug-value"}>{this.state.FPS}</p>
                    </div>
                </div>
                <h2 className={"debug-section-title"}> Player Movement</h2>
                <div className={"debug-section"}>
                    <div className={"debug-row"}>
                        <h3 className={"debug-title"}> Player Horizontal Direction: </h3>
                        <p className={"debug-value"}>{this.state.playerHorizontalDirection}</p>
                    </div>
                    <div className={"debug-row"}>
                        <h3 className={"debug-title"}> Player Vertical Direction: </h3>
                        <p className={"debug-value"}>{this.state.playerVerticalDirection}</p>
                    </div>
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
                </div>
            </div>
        );
    }
}
export default DebugPanel;