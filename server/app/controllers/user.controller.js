const {getUserData, getOrganizations, getOrganizationById,
    updateUser, updatePassword, userDataToSetToLocalStorage,
    updateBirthdateAccess, getOrganizationsByAdminId, userDataToSetToAdmin} = require('../models');
const db = require("../../db");

exports.organizations = async (req, res) => {
    const organizations = await getOrganizations();

    res.status(200).json(organizations);
};

exports.organizationsByAdmin = async (req, res) => {
    const organizations = await getOrganizationsByAdminId(req.body.adminId);

    res.status(200).json(organizations);
};

exports.updateUserData = async (req, res) => {
    const userUpdated = await updateUser(req);
    if (!userUpdated) {
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
    const passwordUpdated = await updatePassword(req);

    if (!passwordUpdated) {
        const msg = {
            title: "Пароль не изменен. ",
            text: "Что-то пошло не так."
        };
        return res.status(404).send({error: true, msg})
    }

    const user = await getUserData(req.userId);
    const organization = await getOrganizationById(user.organization_id);
    const userData = await userDataToSetToLocalStorage(user, organization);

    const msg = {
        title: "Пароль изменен. ",
        text: ""
    };

    res.status(200).send({userData, msg});
};

exports.updateBirthdateAccess = async (req, res) => {
    const birthdateAccessUpdated = await updateBirthdateAccess(req);

    if (!birthdateAccessUpdated) {
        const msg = {
            title: "Ошибка",
            text: "Доступ к дате дня рождения не изменен."
        };
        return res.status(404).send({error: true, msg})
    }

    const user = await getUserData(req.userId);
    const organization = await getOrganizationById(user.organization_id);
    const userData = await userDataToSetToLocalStorage(user, organization);

    const msg = {
        title: `День рождения доступен ${user.filter_birthdate}`,
        text: ""
    };

    res.status(200).send({userData, msg});
};

exports.usersByOrganization = async (req, res) => {
    const { orgId }  = req.body;

    const queryUsers = {
        name: 'get-users',
        text: 'SELECT * FROM users WHERE organization_id = $1 AND role = $2',
        values: [orgId, 'employee']
    };

    const {rows: users} = await db.query(queryUsers);
    const usersUpdate = users.map(user => userDataToSetToAdmin(user));

    res.status(200).json(usersUpdate);
};

exports.deleteUser = async (req, res) => {
    const  queryDelete =  {
        name: 'delete-user',
        text: 'DELETE FROM users WHERE id = $1',
        values: [req.params.id]
    }

    const { rowCount } = await db.query(queryDelete);

    if (!rowCount) {
        const msg = {
            title: "Пользователь не был удален.",
            text: "Что-то пошло не так."
        };
        return res.status(404).send({error: true, msg})
    }

    const updateUserDataSuccess = {
        success: true,
        msg:{
            title: "Пользователь успешно удален.",
            text: ""
        }
    };
    res.status(200).json(updateUserDataSuccess);
}