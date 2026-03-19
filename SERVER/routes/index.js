const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/users/create", userController.createUser);
router.get("/users/list", userController.getAllUsers);
router.get("/users/details/:id", userController.getUser);
router.delete("/users/delete/:id", userController.deleteUser);
router.patch("/users/update/:id", userController.updateUser);

module.exports = router;
