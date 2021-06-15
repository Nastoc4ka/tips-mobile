const {authJwt} = require("../middlewares");
const controller = require("../controllers/organisations.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
           // "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            "Access-Control-Allow-Origin", "*",
            'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            "Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
        );
        next();
    });

    app.get("/api/organisations", controller.organisations);
    app.post("/api/organisations", controller.organizationsByAdmin);
    // app.get("/api/users", [authJwt.verifyToken], controller.users);
    // app.get("/api/dashboard", [authJwt.verifyToken], controller.dashboard);
    // app.post("/api/profiles", [authJwt.verifyToken], controller.userAddProfile);
    // app.put("/api/profiles", [authJwt.verifyToken], controller.userUpdateProfile);
    // app.delete("/api/profiles", [authJwt.verifyToken], controller.userDeleteProfile);

};
