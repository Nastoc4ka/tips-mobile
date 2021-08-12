const {
  getOrganizations,
  getOrganizationById,
  getOrganizationsByAdminId,
  updateUser,
  deleteUser,
  updatePassword,
  userDataToSetToLocalStorage,
  getUserDataByUserId,
  updateBirthdateAccess,
  getCardNumber,
  createTip,
  getNews,
  updateNews,
  createNews,
  deleteNews,
  mainUserData,
  getReactions,
  newsData,
  getImportantNews,
  deleteImportantNews,
} = require("../models");

exports.deleteUser = async (req, res) => {
  const userDeleted = await deleteUser(req.params.id)

  if (!userDeleted) {
    const msg = {
      title: "Пользователь не был удален.",
      text: "Что-то пошло не так."
    };
    return res.status(404).send({ error: true, msg })
  }

  const updateUserDataSuccess = {
    success: true,
    msg: {
      title: "Пользователь успешно удален.",
      text: ""
    }
  };
  res.status(200).json(updateUserDataSuccess);
}

exports.news = async (req, res) => {
  const user = await getUserDataByUserId(req.userId);
  const organization = await getOrganizationById(user.organization_id);
  const news = await getNews(organization.admin_id, req.userId);
  console.log(news);
  const admin = await getUserDataByUserId(organization.admin_id);
  const tips = await getUserDataByUserId(0);
  const importantNews = await getImportantNews(req.userId);
  const mainAdminData = mainUserData(admin);
  const mainTipsData = mainUserData(tips);

  const newsWithUserData = await Promise.all(news.map(async (el) => {
    const reactions = await getReactions(el.id);
    el.reactions = reactions;

    const newEl = newsData(el);

    const importantEl = importantNews.find((news) => news.news_id === newEl.id);

    if (importantEl) {
      newEl.important = true;
      newEl.importantId = importantEl.id
    }

    if (newEl.userId === mainAdminData.id) {
      return {
        ...newEl,
        user: {
          ...mainAdminData
        }
      }
    } else if (newEl.userId === mainTipsData.id) {
      return {
        ...newEl,
        user: {
          ...mainTipsData
        }
      }
    } else {
      return newEl
    }
  }))

  const filteredNews = newsWithUserData.sort((prev, next) => {
    return prev.creationDate - next.creationDate;
  });

  console.log(filteredNews)

  res.status(200).json(filteredNews);
};

exports.updateNews = async (req, res) => {
  const updatedNews = await updateNews(req.body);
  if (!updatedNews) {
    const msg = {
      title: "Данные не обновлены. ",
      text: "Что-то пошло не так.",
    };
    return res.status(404).send({ error: true, msg });
  }

  const updatedNewsDataSuccess = {
    success: true,
    msg: {
      title: "Новость обновлена.",
      text: "",
    },
  };

  res.status(200).json(updatedNewsDataSuccess);
};

exports.deleteNews = async (req, res) => {
  const newsDeleted = await deleteNews(req.query.id);

  if (newsDeleted.length === 0) {
    return res.status(404).send({ error: true, msg: "Новость не найдена" });
  }

  res.status(200).json({ success: true });
};

exports.createNews = async (req, res) => {
  const createNews = await createNews(req.body);
  console.log("createNews controller", createNews);
  if (createNews.length === 0) {
    return res.status(404).send({ error: true, msg: "Новость не добавлена" });
  }

  res.status(201).json({ success: true });
};

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
      text: "Что-то пошло не так.",
    };
    return res.status(404).send({ error: true, msg });
  }

  const updateUserDataSuccess = {
    success: true,
    msg: {
      title: "Данные успешно обновлены.",
      text: "",
    },
  };

  res.status(200).json(updateUserDataSuccess);
};

exports.updatePassword = async (req, res) => {
  const passwordUpdated = await updatePassword(req);

  if (!passwordUpdated) {
    const msg = {
      title: "Пароль не изменен. ",
      text: "Что-то пошло не так.",
    };
    return res.status(404).send({ error: true, msg });
  }

  const user = await getUserDataByUserId(req.userId);

  const organization = await getOrganizationById(user.organization_id);

  const userData = await userDataToSetToLocalStorage(user, organization);

  const msg = {
    title: "Пароль изменен. ",
    text: "",
  };

  res.status(200).send({ userData, msg });
};

exports.updateBirthdateAccess = async (req, res) => {
  const birthdateAccessUpdated = await updateBirthdateAccess(req);

  if (!birthdateAccessUpdated) {
    const msg = {
      title: "Ошибка",
      text: "Доступ к дате дня рождения не изменен.",
    };
    return res.status(404).send({ error: true, msg });
  }

  const user = await getUserDataByUserId(req.userId);

  const organization = await getOrganizationById(user.organization_id);

  const userData = await userDataToSetToLocalStorage(user, organization);

  const msg = {
    title: `День рождения доступен ${user.filter_birthdate}`,
    text: "",
  };

  res.status(200).send({ userData, msg });
};

exports.usersByOrganization = async (req, res) => {
  const { orgId } = req.body;

  const queryUsers = {
    name: "get-users",
    text: "SELECT * FROM users WHERE organization_id = $1 AND role = $2",
    values: [orgId, "employee"],
  };

  const { rows: users } = await db.query(queryUsers);

  res.status(200).json(users);
};

const CloudIpsp = require("cloudipsp-node-js-sdk");

exports.pay = async (req, res) => {
  const requestData = req.body;
  const cardNumber = await getCardNumber(requestData.order_desc);

  const fondy = new CloudIpsp({
    merchantId: 700001,
    secretKey: "test",
    protocol: "2.0",
  });

  const receivers = [
    {
      requisites: {
        amount: +requestData.amount,
        merchant_id: 600001,
      },
      type: "merchant",
    },
    {
      requisites: {
        amount: 0,
        merchant_id: 700001,
      },
      type: "merchant",
    },
  ];

  requestData.receiver = receivers;
  console.dir("requestData", requestData);
  fondy
    .Checkout(requestData)
    .then(async (data) => {
      await createTip(requestData.amount, requestData.order_desc).then(
        (tip) => {
          console.log("tip", tip);
          res.status(200).json(data);
        }
      );
    })
    .catch((error) => {
      console.dir(error);
    });
};

exports.deleteImportantNews = async (req, res) => {
  console.log("hello", req.params.id)

  const importantNewsDeleted = await deleteImportantNews(+req.params.id);
  if (!importantNewsDeleted) {
    const msg = {
      title: "Метка не снята.",
      text: "Что-то пошло не так."
    };
    return res.status(404).send({ error: true, msg })
  }

  const updateUserDataSuccess = {
    success: true,
  };
  res.status(200).json(updateUserDataSuccess);
}