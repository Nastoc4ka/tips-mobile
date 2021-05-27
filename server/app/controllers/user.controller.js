const {findUserById, getUserData, saveUserData} = require('../models');
const db = require("../../db");


exports.userProfiles = async (req, res) => {
    console.log(req.query.id);
    const queryProfiles = {
        name: 'get-profiles',
        text: 'SELECT * FROM profiles WHERE user_id = $1',
        values: [req.query.id],
    };

    const {rows: profiles} = await db.query(queryProfiles);
    res.status(200).json(profiles);
};

exports.dashboard = async (req, res) => {

    const queryUsersQuantity = {
        name: 'get-users-quantity',
        text: 'SELECT COUNT(*) FROM users',
    };

    const queryProfilesQuantity = {
        name: 'get-profiles-quantity',
        text: 'SELECT COUNT(*) FROM profiles',
    };

    const queryProfilesBirthdate = {
        name: 'get-profiles-birthdate',
        text: 'SELECT birthdate FROM profiles',
    };

    const {rows: [{count: users}]} = await db.query(queryUsersQuantity);
    const {rows: [{count: profiles}]} = await db.query(queryProfilesQuantity);
    const {rows: profilesBirthdate} = await db.query(queryProfilesBirthdate);
    const profilesAdult = profilesBirthdate.filter(({birthdate}) => {
        birthdate = +new Date(birthdate.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));
        const age = ~~((Date.now() - birthdate) / (31557600000));

        return age >= 18
    }).length;

    res.status(200).json({users, profiles, profilesAdult});
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

function queryQuantityOfUsersProfiles(userId) {
    const query = 'SELECT COUNT(*) FROM profiles WHERE user_id = $1';
    const values = [userId];
    return db.query(query, values);
}

exports.userAddProfile = async (req, res) => {

    const newProfile = {
        ...req.body,
    };

    createProfile(newProfile).catch((e) => {
        return res.status(400).send({error: true, msg: 'Profile wasn`t added'})
    });

    res.status(201).json({success: true});
};

function createProfile(profile) {
    const query = `INSERT INTO profiles (name, gender, birthdate, city, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [profile.name, profile.gender, profile.birthdate, profile.city, profile.userId];
    return db.query(query, values);
}

exports.userUpdateProfile = async (req, res) => {

    const updateProfile = {
        text: 'UPDATE profiles SET name=$1, gender=$2, birthdate=$3, city=$4 WHERE id = $5',
        values: [req.body.name, req.body.gender, req.body.birthdate, req.body.city, req.body.id]
    };

    const {rows: profile} = await db.query(updateProfile);
    if (!profile) {
        return res.status(404).send({error: true, msg: 'Profile not found'})
    }

    res.status(200).json('Profile updated');
};

exports.userDeleteProfile = async (req, res) => {
    const deleteProfile = {
        name: 'delete-profile',
        text: 'DELETE FROM profiles WHERE id = $1 RETURNING *',
        values: [req.query.id],
    };

    const {rows: profileDeleted} = await db.query(deleteProfile);

    if (profileDeleted.length === 0) {
        return res.status(404).send({error: true, msg: 'Profile not found'})
    }

    res.status(200).json({success: true});
};