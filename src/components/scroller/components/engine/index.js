import React, { Component } from 'react';

class Engine extends Component {

    constructor(props) {
        super(props);

        this.tick();
    }

    
    componentDidMount() {
        // add event listener for key presses, and emit to listener methods the keycode
        // a = 65, w=87, d=68, s=83, space=32
        document.addEventListener('keydown', (e) => {
            this.props.onKeyDown((e.keyCode));
        });
    }

    // emit to listener methods that a tick has occured
    tick() {
        this.props.onTick();
        window.requestAnimationFrame(() => this.tick());
    }

    render() {
        return <div>hello world</div>
    }
}


export default Engine;