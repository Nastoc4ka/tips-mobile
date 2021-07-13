const {getUserDataByUserId} = require("../models");
const db = require("../../db");

checkDuplicatePhoneNumber = async (req, res, next) => {

    const {rows: existUsers} = await db.query('SELECT phone_number, phone_number FROM users');
    const userToAuth = req.body;

    //check if the phone number exist or not
    const phoneNumber = existUsers.find(user => user.phone_number === userToAuth.phoneNumber);
    const msg = {
        title: "По этому номеру телефона уже зарегистрирован пользователь!",
        text: ""
    };
    if (phoneNumber) {
        res.status(400).send({msg});
        return;
    }

    next();
};

const verifySignUp = {
    checkDuplicatePhoneNumber,
};

module.exports = verifySignUp;
