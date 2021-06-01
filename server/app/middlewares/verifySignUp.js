const {getUserData} = require("../models");
const db = require("../../db");

checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const {rows: existUsers} = await db.query('SELECT phone_number, phone_number FROM users');
console.log(existUsers);
    const userToAuth = req.body;

    //check if the email exist or not
    const phoneNumber = existUsers.find(user => user.phone_number === userToAuth.phoneNumber);
    const email = existUsers.find(user => user.phoneNumber === userToAuth.phoneNumber);

    if (phoneNumber) {
        res.status(400).send({msg: "По этому номеру телефона уже зарегистрирован пользователь!"});
        return;
    }

    if (email) {
        res.status(400).send({msg: "Email is already in use!"});
        return;
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
