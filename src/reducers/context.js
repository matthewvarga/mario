export default function context(state = {data: null}, action) {
    switch (action.type) {
        case 'SET_CONTEXT':
            return {
                ...state,
                data: action.context
            };
        default:
            return state;
    }
}