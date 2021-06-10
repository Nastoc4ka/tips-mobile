import BaseError from "./BaseError";

class LoginError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default LoginError;