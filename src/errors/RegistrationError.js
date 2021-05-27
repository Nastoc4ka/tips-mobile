import BaseError from "./BaseError";

class RegistrationError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default RegistrationError;