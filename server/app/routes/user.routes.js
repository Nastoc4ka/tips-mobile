const {authJwt} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/organizations", controller.organizations);
    app.put("/api/userData", [authJwt.verifyToken], controller.updateUserData);
    app.post("/api/users", [authJwt.verifyToken], controller.usersByOrganization);
    app.post("/api/organizations", [authJwt.verifyToken], controller.organizationsByAdmin);
    app.put("/api/updatePassword", [authJwt.verifyToken], controller.updatePassword);

    // app.get("/api/users", [authJwt.verifyToken], controller.users);
    // app.get("/api/dashboard", [authJwt.verifyToken], controller.dashboard);
    // app.post("/api/profiles", [authJwt.verifyToken], controller.userAddProfile);
    // app.put("/api/profiles", [authJwt.verifyToken], controller.userUpdateProfile);
    // app.delete("/api/profiles", [authJwt.verifyToken], controller.userDeleteProfile);

};
