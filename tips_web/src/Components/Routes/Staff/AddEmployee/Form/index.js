import React from "react";
import Input from "../../../../c/Input";
import FormSelect from "../../../../c/FormSelect";
import AddButton from "../../../../c/Button";
import AddAvatar from "./AddAvatar/AddAvatar";
import { useDispatch } from "react-redux";
import { addUserSaga } from "../../../../../redux/actions";

const Form = ({ data, setData }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, phoneNumber, position, avatar, password } = data;
  console.log(password);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    dispatch(addUserSaga(data));
  };

  return (
    <form className="addEmployee__form">
      <Input
        label="Имя"
        type="text"
        variant="outlined"
        size="small"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />

      <Input
        label="Фамилия"
        type="text"
        variant="outlined"
        size="small"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />

      <Input
        label="Телефон"
        type="tel"
        variant="outlined"
        size="small"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
      />

      <FormSelect value={position} handleChange={handleChange} />

      <AddAvatar value={avatar} handleChange={handleChange} />

      <AddButton handleClick={handleAddBtnClick} type="fill">
        Добавить
      </AddButton>
    </form>
  );
};

export default Form;
