import { OrganizationsError } from "../errors";
import {catchError, client} from './client';

const getOrganizations = () => {
    return client.get(`/organizations`)
        .then(({data}) => data)
        .catch(() => catchError(OrganizationsError)());
};

export default {
    getOrganizations,
};