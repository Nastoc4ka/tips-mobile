const db = require("../../db");
const {userDataToSetToLocalStorage, getUserDataByPhone, getOrganizationById, getUserPasswordByUserId} = require("../models");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organizationId: req.body.organizationId,
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
    const query = `INSERT INTO users (first_name, last_name, role, organization_id, password, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [user.firstName, user.lastName, user.role, user.organizationId, user.password, user.phoneNumber];
    return db.query(query, values);
}

exports.signin = async (req, res) => {
    const userToAuth = req.body;

    const user = await getUserDataByPhone(userToAuth.phoneNumber);

    const passwordIsValid = user && bcrypt.compareSync(
        userToAuth.password,
        user?.password
    );

    if (!user || !passwordIsValid) {
        const msg = {
            title: "номер телефона или пароль указаны неверно.",
            text: ""
        };
        return res.status(404).send({error: true, msg})
    }

    const organization = await getOrganizationById(user.organization_id);

    if (!user.verified) {
        const msg = {
            title: "Регистрация еще не подтверждена.",
            text: "Ожидайте смс от администратора."
        };
        return res.status(404).send({error: true, msg})
    }

    const userData = await userDataToSetToLocalStorage(user, organization);


    res.status(200).send(userData);
};

const validatePassword = (passwordToConfirm, passwordFromDB) => {
    return passwordFromDB && bcrypt.compareSync(
        passwordToConfirm,
        passwordFromDB
    );
};

exports.confirmPassword = async (req, res) => {

    const dataToConfirm = req.body;

    const password = await getUserPasswordByUserId(req.userId);

    const passwordIsValid = validatePassword(dataToConfirm.password, password);

    if (!passwordIsValid) {
        const msg = {
            title: "пароль указан неверно.",
            text: ""
        };
        return res.status(404).send({error: true, msg})
    }
    res.status(200).send({success: true});
};