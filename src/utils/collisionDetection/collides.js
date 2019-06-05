import InvalidInputException from "../../errors/InvalidInputException";

/**
 * checks whether or not something is null / undefined. Needed because
 * doing !0 returns true, when we want to return false for 0.
 * @param {anything} obj 
 */
function _isInvalid(obj) {
    return(obj === null || obj === undefined);
}


/**
 * checks for collision between two rectangles.
 * 
 * Both objects must contains the following fields:
 *  x: the top left x coord of rectangle
 *  y: the top right y coord of rectangle
 *  w: the width of the rectangle
 *  h: the height of the rectangle
 * @param {Object} obj1 - object of the form: 
 *                        {x: int - x coord of object
 *                         y: int - y coord of object
 *                         w: int - width of object
 *                         h: int - height of object}
 * @param {Object} obj2 - object of the form: 
 *                        {x: int - x coord of object
 *                         y: int - y coord of object
 *                         w: int - width of object
 *                         h: int - height of object}
 */
export default function collides(obj1, obj2) {

    // todo fix
    if(_isInvalid(obj1) || _isInvalid(obj2) || 
       _isInvalid(obj1.x) || _isInvalid(obj1.y) || _isInvalid(obj1.w) || _isInvalid(obj1.h) || 
       _isInvalid(obj2.x) || _isInvalid(obj2.y) || _isInvalid(obj2.w) || _isInvalid(obj2.h)) {
        
        console.log("invalid input");
        console.log("obj1: ");
        console.log(obj1);
        console.log("obj2: ");
        console.log(obj2);
        throw new InvalidInputException("The input provided is invalid. Please ensure all required content is provided.");
    }

    let ax1 = obj1.x;
    let bx2 = obj2.x + obj2.w;
    let ax2 = obj1.x + obj1.w;
    let bx1 = obj2.x;
    let ay1 = obj1.y;
    let by2 = obj2.y + obj2.h;
    let ay2 = obj1.y + obj1.h;
    let by1 = obj2.y;

    return ((ax1 < bx2) && (ax2 > bx1) && (ay1 < by2) && (ay2 > by1));
}