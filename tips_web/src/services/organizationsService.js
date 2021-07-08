// import { OrganizationsError } from "../errors";
import {catchError, client} from './client';

const getOrganizations = (adminId) => {
    const obj = {
        adminId
    };
    return client.post(`/organizations`, obj)
        .then(({data}) => {
            return data
        })
        .catch((e)  => console.log(e, "bad"));
};

export default {
    getOrganizations,
};