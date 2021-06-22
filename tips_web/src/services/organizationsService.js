// import { OrganisationsError } from "../errors";
import { catchError, client } from "./client";

const getOrganizations = (adminId) => {
  const obj = {
    adminId,
  };
  return client
    .post(`/organisations`, obj)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log(e, "bad"));
};

const getStaff = (orgId) => {
  const obj = {
    orgId,
  };
  return client
    .post(`/organisations`, obj)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => console.log(e, "bad"));
};

export default {
  getOrganizations,
};
