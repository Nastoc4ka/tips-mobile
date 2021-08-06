const {
    getUserDataByUserId, getOrganizations, getOrganizationById,
    updateUser, updatePassword, userDataToSetToLocalStorage,
    updateBirthdateAccess, getOrganizationsByAdminId, userDataToSetToAdmin, getCardNumber, createTip
} = require('../models');

exports.organizations = async (req, res) => {
    const organizations = await getOrganizations();

    res.status(200).json(organizations);
};

exports.organizationsByAdmin = async (req, res) => {
    const organizations = await getOrganizationsByAdminId(req.body.adminId);

    res.status(200).json(organizations);
};

exports.updateUserData = async (req, res) => {
    console.log(req);
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
        msg: {
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

    const user = await getUserDataByUserId(req.userId);
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

    const user = await getUserDataByUserId(req.userId);
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

const CloudIpsp = require('cloudipsp-node-js-sdk');

exports.pay = async (req, res) => {
    const requestData = req.body;
    const cardNumber = await getCardNumber(requestData.order_desc);

    //const CloudIpsp = require('../lib');

    const fondy = new CloudIpsp(
        {
            merchantId: 700001,
            secretKey: 'test',
            protocol: '2.0'
        }
    );

    const receivers = [{
        requisites: {
            amount: +requestData.amount,
            merchant_id: 600001
        },
        type: 'merchant'
    },
        {
            requisites: {
                amount: 0,
                merchant_id: 700001
            },
            type: 'merchant'
        }];

    requestData.receiver = receivers;
console.dir('requestData', requestData);
    fondy.Checkout(requestData).then(async data => {
        await createTip(requestData.amount, requestData.order_desc)
            .then((tip) => {
                console.log('tip', tip);
                res.status(200).json(data)
            });
    }).catch((error) => {
        console.dir(error)
    })
};
