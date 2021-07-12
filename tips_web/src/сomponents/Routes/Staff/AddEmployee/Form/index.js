import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserSaga } from "../../../../../redux/actions";
import FormSelect from "../../../../elements/FormSelect";
import AddButton from "../../../../elements/Button";
import AddAvatar from "./AddAvatar/AddAvatar";
import { InputWithError } from "../../../../elements/Input";
import InputPhone from "../../../../elements/InputPhone/";

const initialErrors = {
  firstName: null,
  lastName: null,
  phoneNumber: null,
  position: null,
};

const Form = ({ data, setData }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, phoneNumber, position, avatar } = data;
  const [errors, setErrors] = useState(initialErrors);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validation = () => {
    let messages = { ...initialErrors };
    let areInputsValid = true;

    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        if (key !== "avatar") areInputsValid = false;

        if (key === "position") {
          messages[key] = "Выберите позицию сотрудника!";
        } else {
          messages[key] = "Это поле должно быть заполнено!";
        }
      } else if (key === "phoneNumber") {
        if (value.length < 19) {
          areInputsValid = false;
          messages[key] = "Номер телефона введен неверно!";
        }
      }
    }

    return { areInputsValid, messages };
  };

  const onFocus = (e) => {
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleAddBtnClick = (e) => {
    console.log("d");
    e.preventDefault();
    const result = validation();
    setErrors(result.messages);
    if (result.areInputsValid) {
      dispatch(addUserSaga(data));
    }
  };

  return (
    <form className="addEmployee__form" onSubmit={handleAddBtnClick}>
      <InputWithError
        label="Имя"
        type="text"
        variant="outlined"
        size="small"
        name="firstName"
        value={firstName}
        onChange={handleChange}
        onFocus={onFocus}
        error={errors.firstName}
      />

      <InputWithError
        label="Фамилия"
        type="text"
        variant="outlined"
        size="small"
        name="lastName"
        value={lastName}
        onChange={handleChange}
        onFocus={onFocus}
        error={errors.lastName}
      />

      <InputPhone
        value={phoneNumber}
        onBlur={handleChange}
        handleFocus={onFocus}
        error={errors.phoneNumber}
      />

      <FormSelect
        value={position}
        handleChange={handleChange}
        onFocus={onFocus}
        error={errors.position}
      />

      <AddAvatar value={avatar} handleChange={handleChange} />

      <AddButton handleClick={handleAddBtnClick} type="fill">
        Добавить
      </AddButton>
    </form>
  );
};

export default Form;
