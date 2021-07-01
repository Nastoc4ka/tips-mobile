import BaseError from "./BaseError";

class PasswordConfirmationError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default PasswordConfirmationError;