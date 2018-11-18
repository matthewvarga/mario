export default class InvalidColumnException extends Error {
    constructor(...args) {
        super(...args);

        Error.captureStackTrace(this, InvalidColumnException);

    }
}