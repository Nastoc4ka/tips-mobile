const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.getUserPasswordByUserId = async (userId) => {

    const queryPassword = {
        name: 'fetch-userPassword',
        text: 'SELECT password FROM users WHERE id = $1',
        values: [userId],
    };

    const {rows: [{password}]} = await db.query(queryPassword);

    return password
};

exports.getUserDataByUserId = async (userId) => {

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE id = $1',
        values: [userId],
    };

    const {rows: [user]} = await db.query(queryUser);

    return user
};

exports.getUserDataByPhone = async (phoneNumber) => {

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE phone_number = $1',
        values: [phoneNumber],
    };

    const {rows: [user]} = await db.query(queryUser);

    return user
};

exports.getOrganizationById = async (organization_id) => {

    const queryOrganization = {
        name: 'fetch-organization',
        text: 'SELECT * FROM organizations WHERE id = $1',
        values: [organization_id],
    };

    const {rows: [organization]} = await db.query(queryOrganization);

    return organization
};

exports.userDataToSetToLocalStorage = async (user, organization) => {

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 day
    });

    return {
        success: true,
        role: user.role,
        verified: user.verified,
        id: user.id,
        filterBirthdate: user.filter_birthdate,
        birthdate: user.birthdate,
        phoneNumber: user.phone_number,
        position: user.position,
        organization: organization,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        accessToken,
    };
};

exports.getOrganizations = async () => {

    const queryOrganizations =  {
            name: 'get-organizations',
            text: 'SELECT * FROM organizations',
        };

    const {rows: organizations} = await db.query(queryOrganizations);

    return organizations
};

exports.getOrganizationsByAdminId = async (adminId = null) => {

    const queryOrganizations =  {
            name: 'fetch-organizations',
            text: 'SELECT * FROM organizations WHERE admin_id = $1',
            values: [adminId]
        };

    const {rows: organizations} = await db.query(queryOrganizations);

    return organizations
};

exports.getCardNumber = async (userId) => {
    const queryCard =  {
            name: 'fetch-card',
            text: 'SELECT card_number FROM users WHERE id = $1',
            values: [userId]
        };

    const {rows: [{card_number}]} = await db.query(queryCard);
console.log('card_number', card_number);
    return card_number
};

exports.updateUser = async ({body, userId}) => {
    const updateUser = {
        text: 'UPDATE users SET first_name=$1, last_name=$2, phone_number=$3, birthdate=$4, avatar=$5, filter_birthdate=$6, verified=$7, position=$8 WHERE id = $9',
        values: [body.firstName, body.lastName, body.phoneNumber, body.birthdate, body.avatar, body.filterBirthdate, body.verified, body.position, userId]
    };

    const { rowCount } = await db.query(updateUser);

    return rowCount
};

exports.updatePassword = async ({body, userId}) => {

    const password = bcrypt.hashSync(body.password, 8);

    const updatePassword = {
        text: 'UPDATE users SET password=$1 WHERE id = $2',
        values: [password, userId]
    };

    const { rowCount } = await db.query(updatePassword);

    return rowCount
};

exports.updateBirthdateAccess = async ({body, userId}) => {

    const updateBirthdateAccess = {
        text: 'UPDATE users SET filter_birthdate=$1 WHERE id = $2',
        values: [body.access, userId]
    };

    const { rowCount } = await db.query(updateBirthdateAccess);

    return rowCount
};

exports.createTip = async (amount, order_desc) => {
    const query = `INSERT INTO tips (amount, user_id) VALUES ($1, $2) RETURNING *`;
    const values = [amount, order_desc];
    return db.query(query, values);
};