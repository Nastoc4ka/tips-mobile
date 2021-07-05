const sendSMS = (data) => {
  fetch(
    `https://api.turbosms.ua/message/send.json?recipients[0]=${data.phone}&sms[sender]=BRAND&sms[text]=${data.message}&token=94a8b281bc3740a5316d66824c830126ff2c585a`
  )
    .then((res) => res.json())
    .then((res) => console.log("res", res));
};

export default { sendSMS };
