import BaseError from "./BaseError";

class UpdateUserError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default UpdateUserError;