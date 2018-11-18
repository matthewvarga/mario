import {combineReducers} from 'redux';
import canvas from './canvas.js';
import context from './context.js';
export default combineReducers({
    canvas,
    context
})