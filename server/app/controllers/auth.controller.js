const config = require("../config/auth.config");
const db = require("../../db");
const {getUserData, saveUserData} = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organisationId: req.body.organisationId,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'employee',
    };

    const newPerson = await createUser(userData).catch((e) => {
        const msg = {
            title: "Произошла ощибка",
            text: "Пользователь не заренистрирован, обратитесь к автору"
        };
        res.status(500).send({error: true, msg})
    });
    const msg = {
        title: "Регистрация прошла успешно!",
        text: "Ожидайте смс-подтверждение от администратора."
    };
    res.status(201).send({success: true, msg})
};

function createUser(user) {
    const query = `INSERT INTO users (first_name, last_name, role, organisation_id, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [user.firstName, user.lastName, user.role, user.organisationId, user.password, user.phoneNumber];
    return db.query(query, values);
}

exports.signin = async (req, res) => {

    const userToAuth = req.body;

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE phoneNumber = $1',
        values: [userToAuth.phoneNumber],
    };

    const {rows: [user]} = await db.query(queryUser);

    const passwordIsValid = bcrypt.compareSync(
        userToAuth.password,
        user.password
    );

    if (!user || !passwordIsValid) {
        return res.status(404).send({error: true, msg: 'номер телефона или пароль указаны неверно'})
    }

    if (!user.varified) {
        const msg = {
            title: "Регистрация еще не подтверждена.",
            text: "Ожидайте смс от администратора."
        };
        return res.status(404).send({error: true, msg})
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 day
    });

    userDataAsyncStorage = {
        success: true,
        role: user.role,
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        accessToken,
    };

    res.send(userDataAsyncStorage);
};