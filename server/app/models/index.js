const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.getUserData = async (userId) => {

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE id = $1',
        values: [userId],
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

exports.updateUser = async ({body, userId}) => {
    const updateUser = {
        text: 'UPDATE users SET first_name=$1, phone_number=$2, birthdate=$3, avatar=$4 WHERE id = $5',
        values: [body.firstName, body.phoneNumber, body.birthdate, body.avatar, userId]
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