import BaseError from "./BaseError";

class OrganisationsError extends BaseError {
    constructor(msg) {
        super(msg);
    }
}

export default OrganisationsError;