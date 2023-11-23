const express = require("express");
const router = express.Router();
const verifyJWT = require("../Middleware/verifyJwt");

const {handleRefreshToken} = require("../Controllers/refreshTokenController")

const {createUser, deleteUser, loginUser} = require("../Controllers/userController");

router.route("/")
router.route("/:id").delete(verifyJWT ,deleteUser);
router.route("/login").post(loginUser);
router.route("/signup").post(createUser);
router.route("/auth/refresh").get(handleRefreshToken);

module.exports = router;