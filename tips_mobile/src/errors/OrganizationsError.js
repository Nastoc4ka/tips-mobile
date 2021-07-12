import BaseError from "./BaseError";

class OrganizationsError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default OrganizationsError;