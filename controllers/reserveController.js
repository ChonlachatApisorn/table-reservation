const reserveService = require('../services/reserveService')
const { responseMsg } = require('../utils/responseUtil')

const reserveTable = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user;
        const tableId = body.table_id;
        const amount = body.amount;

        const checkByUser = await reserveService.getTableByUserId(userId);
        if (checkByUser.length != 0) {
            return responseMsg(res, 200, "You have reserved a table");
        }

        const checkByTable = await reserveService.getTableByTableId(tableId);
        if (checkByTable[0].user_id != 'empty') {
            return responseMsg(res, 200, "The table has been reserved by other member");
        }

        const reserve = await reserveService.updateTable(tableId, userId, amount);
        if (reserve.affectedRows < 1) {
            return responseMsg(res, 500, "Something was wrong");
        }

        return responseMsg(res, 200, "completed table reservation");
    } catch (error) {
        throw error;
    }
}

const cancelReserve = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.user;
        const tableId = body.table_id;

        const checkByUser = await reserveService.getTableByUserId(userId);
        if (checkByUser.length == 0) {
            return responseMsg(res, 200, "You did not reserve a table");
        }

        const cancelReserve = await reserveService.updateTable(tableId, 'empty', 0);
        if (cancelReserve.affectedRows < 1) {
            return responseMsg(res, 500, "Something was wrong");
        }

        return responseMsg(res, 200, "You have successfully canceled your table reservation");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    reserveTable,
    cancelReserve,
}