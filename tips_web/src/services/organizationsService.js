// import { OrganisationsError } from "../errors";
import authHeader from "./authHeader";
import { catchError, client } from "./client";

const getOrganizations = (adminId) => {
  return client
    .post("/organizations", { adminId }, { headers: authHeader() })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e, "bad");
      throw new Error();
    });
};

const getStaff = (orgId) => {
  return client
    .post("/users", { orgId }, { headers: authHeader() })
    .then(({ data }) => {
      const verified = data.filter((user) => user.verified);
      const notVerified = data.filter((user) => !user.verified);
      return { verified, notVerified };
    })
    .catch((e) => console.log(e, "bad"));
};

const addUser = (userData) => {
  return client
    .post("/auth/add_user", userData, { headers: authHeader() })
    .then((res) => res.data)
    .catch((e) => console.log("Service: ", e));
};

export default {
  getOrganizations,
  getStaff,
  addUser,
};