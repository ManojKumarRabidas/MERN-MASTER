const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.createUser);
router.get("/list", userController.getAllUsers);
router.get("/details/:id", userController.getUser);
router.delete("/delete/:id", userController.deleteUser);
router.patch("/update/:id", userController.updateUser);

module.exports = router;
