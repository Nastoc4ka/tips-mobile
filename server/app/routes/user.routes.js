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
    app.put("/api/updatePassword", [authJwt.verifyToken], controller.updatePassword);
    app.put("/api/updateBirthdateAccess", [authJwt.verifyToken], controller.updateBirthdateAccess);
    app.post("/api/organizations", controller.organizationsByAdmin);
};
