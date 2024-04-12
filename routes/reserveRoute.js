const reserveRoute = require("express").Router();
const reserveController = require('../controllers/reserveController')
const authMiddleware = require('../middlewares/authMiddleware');

reserveRoute.put("/reserve-table", authMiddleware, reserveController.reserveTable);
reserveRoute.put("/cancel-reserve", authMiddleware, reserveController.cancelReserve);

module.exports = reserveRoute;
