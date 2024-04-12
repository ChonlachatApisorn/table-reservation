const { responseMsg } = require('../utils/responseUtil')
const jwt = require("jwt-simple");
const { SECRET } = require('../configs/config');
const { getUserByUserId } = require('../services/userService')

module.exports = async (req, res, next) => {
    try {
        const auth_jwt = req.headers["auth-token"];
        if (!auth_jwt) {
            return responseMsg(res, 401, "you are unauthorized");
        }

        const token = jwt.decode(auth_jwt, SECRET);
        const userId = token.sub;
        const checkUser = await getUserByUserId(userId);
        if (!checkUser) {
            return responseMsg(res, 401, "you are unauthorized")
        }
        req.user = userId;
        next()
    } catch (error) {
        return responseMsg(res, 401, "you are unauthorized")
    }
};