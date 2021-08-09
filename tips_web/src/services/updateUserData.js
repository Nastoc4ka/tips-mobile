// import { UpdateUserError } from "../errors";
import authHeader from "./authHeader";
import { catchError, client } from "./client";

const updateUserDataService = (userData) => {
  return client
    .put("/userData", userData, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export default updateUserDataService;
