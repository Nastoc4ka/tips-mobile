import { OrganisationsError } from "../errors";
import {catchError, client} from './client';
import authHeader from "./authHeader";

const getOrganisations = () => {
    return client.get(`/organisations`)
        .then(({data}) => data)
        .catch(catchError(OrganisationsError));
};

export default {
    getOrganisations,
};