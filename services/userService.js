const uuid = require('uuid')
const bcrypt = require('bcrypt');
const { queryData } = require('../utils/dbConnect')
const { 
    USER: {
        INSERT_USER,
        GET_USER_BY_EMAIL,
        GET_USER_BY_USER_ID,
    },
    USER_AUTH_TOKEN: {
        INSERT_TOKEN,
        DELETE_TOKEN
    },
} = require('../configs/config')

const addUser = async (body) => {
    try {
        const user_id = uuid.v4()
        
        const email = body.email;
        const password = body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await queryData(INSERT_USER, [user_id, email, hashedPassword]);
        return result;
    } catch (error) {
        throw error
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await queryData(GET_USER_BY_EMAIL, [email])
        return result
    } catch (error) {
        throw error
    }
}

const getUserByUserId = async (userid) => {
    try {
        const result = await queryData(GET_USER_BY_USER_ID, [userid])
        return result
    } catch (error) {
        throw error
    }
}

const addUserAuthToken = async (token, userId) => {
    try {
        const result = await queryData(INSERT_TOKEN, [token, userId]);
        return result
    } catch (error) {
        throw error
    }
}

const deleteUserAuthToken = async (userId) => {
    try {
        const result = await queryData(DELETE_TOKEN, [userId])
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    addUser,
    getUserByEmail,
    getUserByUserId,
    addUserAuthToken,
    deleteUserAuthToken
}