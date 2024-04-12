const responseMsg = (res, code, msg) => {
    return res.status(code).json({ massage: msg});

};

module.exports = {
    responseMsg
}