const config = require("../config/auth.config");
const db = require("../../db");
const {getUserData, saveUserData} = require("../models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
console.log(req.body.registrationData);
    const userData = {
        firstName: req.body.firstName,
        city: req.body.city,
        organisation: req.body.organisation,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
        role: 'employee',
    };
    console.log(userData);
    const newPerson = await createUser(userData).catch((e) => {

        console.log(e.stack);
    });

    res.status(201).send({success: true, msg: 'User data added successfully'})
};

function createUser(user) {
    const query = `INSERT INTO users (first_name, role, city, organisation, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [user.firstName, user.role, user.city, user.organisation, user.password];
    return db.query(query, values);
}

exports.signin = async (req, res) => {

    const userToAuth = req.body;

    const queryUser = {
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE phoneNumber = $1',
        values: [userToAuth.phoneNumber],
    };

    const {rows} = await db.query(queryUser);
    const user = rows[0];

    //check if the email exist or not
    if (!user) {
        return res.status(404).send({error: true, msg: 'User not found'})
    }

    const passwordIsValid = bcrypt.compareSync(
        userToAuth.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            error: true,
            token: null,
            msg: "Invalid Password!"
        });
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 day
    });
    res.send({success: true, role: user.role, id: user.id, name: user.firstName, accessToken});
};