const { queryData } = require('../utils/dbConnect')
const { 
    TABLE: {
        UPDATE_TABLE,
        GET_TABLE_BY_USER_ID,
        GET_TABLE_BY_TABLE_ID
    },
} = require('../configs/config')

const updateTable = async (tableId, userId, amount) => {
    try {
        const result = await queryData(UPDATE_TABLE, [amount, userId, tableId]);
        return result;
    } catch (error) {
        throw error;
    }
}

const getTableByUserId = async (userId) => {
    try {
        const result = await queryData(GET_TABLE_BY_USER_ID, [userId]);
        return result
    } catch (error) {
        throw error;
    }
}

const getTableByTableId = async (tableId) => {
    try {
        const result = await queryData(GET_TABLE_BY_TABLE_ID, [tableId]);
        return result
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateTable,
    getTableByUserId,
    getTableByTableId
}