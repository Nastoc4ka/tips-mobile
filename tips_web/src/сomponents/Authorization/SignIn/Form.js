import React, { useState } from "react";
import { Link } from "@material-ui/core";
import AuthorizationButton from "../../elements/Button";
import { Input } from "../../elements/Input";
import InputPhone from "../../elements/InputPhone";

const initialState = {
  phoneNumber: null,
  password: null,
};

const Form = ({ handleSignIn }) => {
  const [data, setData] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLoginBtnPress = (event) => {
    event.preventDefault();
    const result = validation();
    setErrors(result.messages);
    if (result.areInputsValid) handleSignIn(data);
  };

  const onFocus = (event) => {
    if (errors[event.target.name])
      setErrors((prev) => ({ ...prev, [event.target.name]: null }));
  };

  const validation = () => {
    let messages = { ...initialState };
    let areInputsValid = true;

    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        areInputsValid = false;
        messages[key] = "Это поле должно быть заполнено!";
      } else if (key === "phoneNumber") {
        if (value.length < 19) {
          areInputsValid = false;
          messages[key] = "Номер телефона введен неверно!";
        }
      }
    }

    return { areInputsValid, messages };
  };

  return (
    <form className="block__content block__form" onSubmit={onLoginBtnPress}>
      <InputPhone
        value={data.phoneNumber}
        onBlur={handleChange}
        handleFocus={onFocus}
      />

      <Input
        label="Пароль"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        size="small"
        name="password"
        value={data.password}
        onChange={handleChange}
      />

      <Link variant="body2">Забыли пароль?</Link>

      <AuthorizationButton handleClick={onLoginBtnPress}>
        Войти
      </AuthorizationButton>
    </form>
  );
};

export default Form;
