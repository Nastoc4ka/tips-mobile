// import { UpdateUserError } from "../errors";
import authHeader from "./authHeader";
import { catchError, client } from "./client";

const deleteUserService = (userId) => {
  return client
    .delete(`/userData/${userId}`, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export default deleteUserService;
