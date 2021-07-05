const config = require("../config/auth.config");
const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function createUser(user) {
    const query = `INSERT INTO users (first_name, last_name, role, organization_id, password, phone_number, position, avatar, verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const values = [user.firstName, user.lastName, user.role, user.organizationId, user.password, user.phoneNumber, user.position, user.avatar, user.verified];
    return db.query(query, values);
}

exports.addUser = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organizationId: req.body.organizationId,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'employee',
        position: req.body.position,
        avatar: req.body.avatar,
        verified: true,
    };

    await createUser(userData).catch((e) => {
        const msg = {
            title: "Произошла ошибка",
        };
        res.status(500).send({error: true, msg})

    });
    
    res.status(201).send({
        success: true,
        msg: {
            title: "Регистрация прошла успешно!",
            text: "",
        }
    })
};

exports.signup = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organizationId: req.body.organizationId,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'employee',
        position: null,
        avatar: null,
        verified: false,
    };

    await createUser(userData).catch((e) => {
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

exports.signin = async (req, res) => {
    const userToAuth = req.body;

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE phone_number = $1',
        values: [userToAuth.phoneNumber],
    };

    const {rows: [user]} = await db.query(queryUser);

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

    const queryOrganization = {
        name: 'fetch-organization',
        text: 'SELECT * FROM organizations WHERE id = $1',
        values: [user.organization_id],
    };

    const {rows: [organization]} = await db.query(queryOrganization);

    if (!user.verified) {
        const msg = {
            title: "Регистрация еще не подтверждена.",
            text: "Ожидайте смс от администратора."
        };
        return res.status(404).send({error: true, msg})
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 day
    });

    const userDataAsyncStorage = {
        success: true,
        role: user.role,
        id: user.id,
        birthdate: user.birthdate,
        filterBirthdate: user.filter_birthdate,
        phoneNumber: user.phone_number,
        position: user.position,
        organization: organization,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.avatar,
        accessToken,
    };

    res.status(200).send(userDataAsyncStorage);
};

exports.confirmPassword = async (req, res) => {

    const dataToConfirm = req.body;

    const queryPassword = {
        name: 'fetch-userPassword',
        text: 'SELECT password FROM users WHERE id = $1',
        values: [req.userId],
    };

    const {rows: [{password}]} = await db.query(queryPassword);

console.log(password);

    const passwordIsValid = password && bcrypt.compareSync(
        dataToConfirm.password,
        password
    );

    if (!passwordIsValid) {
        const msg = {
            title: "пароль указан неверно.",
            text: ""
        };
        return res.status(404).send({error: true, msg})
    }
    res.status(200).send({success: true});
};