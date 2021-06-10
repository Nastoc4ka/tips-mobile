class BaseError extends Error {
    constructor(msg) {
        super();
        this.msg = msg;
    }
}

export default BaseError;