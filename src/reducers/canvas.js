export default function canvas(state = {data: null}, action) {
    switch (action.type) {
        case 'SET_CANVAS':
            return {
                ...state,
                data: action.canvas
            };
        default:
            return state;
    }
}