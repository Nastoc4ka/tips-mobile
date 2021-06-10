import BaseError from "./BaseError";

class UnauthorizedError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default UnauthorizedError;