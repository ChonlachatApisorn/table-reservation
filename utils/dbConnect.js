const mysql = require("mysql2");
const {
    DATABASE: {
        DB_HOST,
        DB_NAME,
        DB_PASSWORD,
        DB_USER,
        TIME_ZONE,
    }
} = require('../configs/config')

const connection = mysql.createPool({
    connectionLimit: 10,
    waitForConnections: true,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    timezone: TIME_ZONE,
});

async function queryData(query, data) {
    return new Promise((resolve, reject) => {
        connection.query(query, data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
}

module.exports = {
    queryData
}