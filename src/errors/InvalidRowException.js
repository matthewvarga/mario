export default class InvalidRowException extends Error {
    constructor(...args) {
        super(...args);

        Error.captureStackTrace(this, InvalidRowException);

    }
}