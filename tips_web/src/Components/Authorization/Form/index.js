import React, { useState } from 'react';
import {Link} from '@material-ui/core';
import FormButton from './FormButton';
import Input from '../../c/Input';

const Form = ({handleLogin}) => {
    const [data, setData] = useState({
        phoneNumber: '',
        password: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const onLoginBtnPress = (event) => {
        event.preventDefault();
        handleLogin(data);
    }

    return (
        <form className='block__content'>
            <Input
                label="Телефон"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                size="small"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
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
            <Link
                 variant="body2"
            >
                Забыли пароль?
            </Link>
            <FormButton onClick={onLoginBtnPress}>Войти</FormButton>
        </form>
    )
}

export default Form;