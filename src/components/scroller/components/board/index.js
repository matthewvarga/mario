import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setContext, setCanvas} from "../../../../actions/index";
import './index.css';

class Board extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { 
        let canvas = this.refs["canvas-ref"];
        let context = this.refs["canvas-ref"].getContext("2d");

        this.props.setCanvas(canvas);
        this.props.setContext(context);
        console.log("board");
        console.log(context);
        console.log("store");
        console.log(this.props.context);
    }

    render() {
        return <canvas ref={"canvas-ref"} className={"canvas"} width={"512"} height={"512"} style={{border:"1px solid #d3d3d3"}}></canvas>
    }
}

// redux, provide access to store canvas and context
function mapStateToProps(state) {
    return {
        canvas: state.canvas.data,
        context: state.context.data
    };
}
// dispach 
const mapDispatchToProps = dispatch => ({
    setCanvas: canvas => dispatch(setCanvas(canvas)),
    setContext: context => dispatch(setContext(context))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);