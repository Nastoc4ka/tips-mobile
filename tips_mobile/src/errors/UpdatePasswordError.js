import BaseError from "./BaseError";

class UpdatePasswordError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default UpdatePasswordError;