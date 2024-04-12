const config = {
    SECRET: process.env.SECRET,
    DATABASE: {
        TIME_ZONE: process.env.TIME_ZONE,
        DB_HOST: process.env.DB_HOST_READER,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
    },
    USER: {
        INSERT_USER: `
            INSERT INTO 
                user (user_id, email, password, create_date, update_date)
            VALUES
                (?, ?, ?, NOW(), NOW())
        `,
        GET_USER_BY_EMAIL: `SELECT * FROM user WHERE email = ?`,
        GET_USER_BY_USER_ID: `SELECT * FROM user WHERE user_id = ?`,
      },
    USER_AUTH_TOKEN: {
        INSERT_TOKEN: `
        INSERT INTO
            user_auth_token (token, create_date, user_id)
        VALUES
            (?, NOW(), ?)
        `,
        DELETE_TOKEN: `DELETE FROM user_auth_token WHERE user_id = ?`,
    },
    TABLE: {
        UPDATE_TABLE: `
            UPDATE table_reserve 
            SET amount = ?, user_id = ?, update_date = NOW() 
            WHERE table_id = ?`,
        GET_TABLE_BY_USER_ID: `SELECT * FROM table_reserve WHERE user_id = ?`,
        GET_TABLE_BY_TABLE_ID: `SELECT user_id FROM table_reserve WHERE table_id = ?`,
    }
};

module.exports = config;