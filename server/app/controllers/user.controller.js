const {findUserById, getUserData, saveUserData} = require('../models');
const db = require("../../db");


exports.organizations = async (req, res) => {
    const queryOrganizations = {
        name: 'get-organizations',
        text: 'SELECT * FROM organisations',
    };

    const {rows: organizations} = await db.query(queryOrganizations);

    res.status(200).json(organizations);
};

exports.organizationsByAdmin = async (req, res) => {
    const {adminId}  = req.body;
    const queryOrganizations = {
        name: 'fetch-organizations',
        text: 'SELECT * FROM organisations WHERE admin_id = $1',
        values: [adminId]
    }

    const {rows: organizations} = await db.query(queryOrganizations);

    res.status(200).json(organizations);
};

exports.updateUserData = async (req, res) => {
    const updateUser = {
        text: 'UPDATE users SET first_name=$1, phone_number=$2, birthdate=$3, avatar=$4 WHERE id = $5',
        values: [req.body.firstName, req.body.phoneNumber, req.body.birthdate, req.body.avatar, req.userId]
    };

    const { rowCount } = await db.query(updateUser);

    if (!rowCount) {
        const msg = {
            title: "Данные не обновлены.",
            text: "Что-то пошло не так."
        };
        return res.status(404).send({error: true, msg})
    }

    const updateUserDataSuccess = {
        success: true,
        msg:{
            title: "Данные успешно обновлены.",
            text: ""
        }
    };

    res.status(200).json(updateUserDataSuccess);
};

exports.usersByOrganization = async (req, res) => {
    const {orgId}  = req.body;

    const queryUsers = {
        name: 'get-users',
        text: 'SELECT * FROM users WHERE organisation_id = $1 AND role = $2',
        values: [orgId, 'employee']
    };

    const {rows: users} = await db.query(queryUsers);

    res.status(200).json(users);
};