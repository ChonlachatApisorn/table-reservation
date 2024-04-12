const userService = require('../services/userService')
const { responseMsg } = require('../utils/responseUtil')
const bcrypt = require('bcrypt');
const jwt = require("jwt-simple");
const { SECRET } = require('../configs/config');

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;

        const checkEmail = await userService.getUserByEmail(email);
        if (checkEmail.length != 0) {
            return responseMsg(res, 200, "This Email is Already!");
        }

        const register = await userService.addUser(body);
        if (register.affectedRows < 1) {
            return responseMsg(res, 500, "Something was wrong!");
        }

        return responseMsg(res, 200, "Register is Success!");
    } catch (error) {
        throw error;
    }
}

const userLogin = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const password = body.password;

        const getUser = await userService.getUserByEmail(email);
        const user = getUser[0];
        if (!user) {
            return responseMsg(res, 200, "Email is incorrect");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return responseMsg(res, 200, "Password is incorrect");
        }

        const payload = {
            sub: user.user_id,
            iat: new Date().getTime(),
        }
        const token = jwt.encode(payload, SECRET)

        await userService.addUserAuthToken(token, user.user_id);
        return responseMsg(res, 200, token);
    } catch (error) {
        throw error
    }
}

const userLogout = async (req, res) => {
    try {
        const userId = req.user;
        const checkDelete = await userService.deleteUserAuthToken(userId);
        if (checkDelete.affectedRows < 1) {
            return responseMsg(res, 200, "Something was wrong!");
        }

        return responseMsg(res, 200, "Logout success!!");
    } catch (error) {
        throw error
    }
}

module.exports = {
    registerUser,
    userLogin,
    userLogout
}