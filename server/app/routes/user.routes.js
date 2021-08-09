const { authJwt } = require("../middlewares");
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
  app.delete("/api/userData/:id", [authJwt.verifyToken], controller.deleteUser);
  app.post("/api/users", [authJwt.verifyToken], controller.usersByOrganization);
  app.post(
    "/api/organizations",
    [authJwt.verifyToken],
    controller.organizationsByAdmin
  );
  app.put(
    "/api/updatePassword",
    [authJwt.verifyToken],
    controller.updatePassword
  );
  app.put(
    "/api/updateBirthdateAccess",
    [authJwt.verifyToken],
    controller.updateBirthdateAccess
  );
  app.post("/api/organizations", controller.organizationsByAdmin);
  app.get("/api/news", [authJwt.verifyToken], controller.news);
  app.post("/api/news", [authJwt.verifyToken], controller.createNews);
  app.put("/api/news", [authJwt.verifyToken], controller.updateNews);
  app.delete("/api/news", [authJwt.verifyToken], controller.deleteNews);
  app.post("/api/pay", controller.pay);
};
