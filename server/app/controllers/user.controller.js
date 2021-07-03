const {findUserById, getUserData, saveUserData} = require('../models');
const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.organisations = async (req, res) => {
    const queryOrganisations = {
        name: 'get-organisations',
        text: 'SELECT * FROM organisations',
    };

    const {rows: organisations} = await db.query(queryOrganisations);

    res.status(200).json(organisations);
};

exports.organizationsByAdmin = async (req, res) => {
    const {adminId}  = req.body;

    const queryOrganizations = {
        name: 'fetch-organizations',
        text: 'SELECT * FROM organisations WHERE admin_id = $1',
        values: [adminId]
    };

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
            title: "Данные не обновлены. ",
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

exports.updatePassword = async (req, res) => {

    const password = bcrypt.hashSync(req.body.password, 8);

    const updatePassword = {
        text: 'UPDATE users SET password=$1 WHERE id = $2',
        values: [password, req.userId]
    };

    const { rowCount } = await db.query(updatePassword);

    if (!rowCount) {
        const msg = {
            title: "Пароль не изменен. ",
            text: "Что-то пошло не так."
        };
        return res.status(404).send({error: true, msg})
    }

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE id = $1',
        values: [req.userId],
    };

    const {rows: [user]} = await db.query(queryUser);

    const queryOrganisation = {
        name: 'fetch-organisation',
        text: 'SELECT * FROM organisations WHERE id = $1',
        values: [user.organisation_id],
    };

    const {rows: [organisation]} = await db.query(queryOrganisation);

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 day
    });

    const userData = {
        success: true,
        role: user.role,
        id: user.id,
        filterBirthdate: user.filter_birthdate,
        birthdate: user.birthdate,
        phoneNumber: user.phone_number,
        position: user.position,
        organisation: organisation,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        accessToken,
    };

    const msg = {
        title: "Пароль изменен. ",
        text: ""
    };

    console.log('userData', userData);
    res.status(200).send({userData, msg});
};

exports.users = async (req, res) => {

    const queryUsers = {
        name: 'get-users',
        text: 'SELECT * FROM users'
    };
    const {rows: users} = await db.query(queryUsers);

    const usersData = await Promise.all(users.map(async (user) => {
        const {rows: [{count}]} = await queryQuantityOfUsersProfiles(user.id);
        user.profilesQuantity = count;
        return user
    }));

    res.status(200).json(usersData);
};