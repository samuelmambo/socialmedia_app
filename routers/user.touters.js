const useController = require("../contollers/users.controller");
const express = require('express');

const router = express.Router();

router.post("/register", useController.register);
router.post("/login", useController.login);
router.get("/user-profile", useController.userProfile);

module.exports = router;