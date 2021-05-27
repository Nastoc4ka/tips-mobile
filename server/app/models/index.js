const db = require("../../db");
const fs = require('fs');

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('users.json', stringifyData)
};
//get the user data from json file
const getUserData = () => {

    const jsonData = fs.readFileSync('users.json');
    return JSON.parse(jsonData)
};

const findUserById = (id) => {
    const existedUsers = getUserData();
    const user = existedUsers.find(u => u.id === id);
    if (!user) {
        throw Error('User not found');
    }
    return user;
};

module.exports = {saveUserData, getUserData, findUserById};