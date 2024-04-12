const userRoute = require("express").Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

userRoute.post("/register", userController.registerUser);
userRoute.post("/login", userController.userLogin);
userRoute.post("/logout", authMiddleware, userController.userLogout);

module.exports = userRoute;
