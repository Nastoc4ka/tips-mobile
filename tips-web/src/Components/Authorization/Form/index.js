import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {Typography, Link} from '@material-ui/core';
import FormButton from './FormButton';
import Input from './Input';
import { loginSaga } from '../../../redux/actions';

const Form = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        phoneNumber: '',
        password: ''
    });

    const handlechange = (e) => {
        const {name, value} = e.currentTarget;

        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const login = (e) => {
        e.preventDefault();
        dispatch(loginSaga(data));
    }

    return (
        <div className='login__form_wrapper'>
            <Typography variant="h1" component="h2" gutterBottom>
                Привет
            </Typography>
            <form className='login__form'>
                <Input
                    label="Телефон"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={handlechange}
                />
                <Input
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    name="password"
                    value={data.password}
                    onChange={handlechange}
                />
                <Link
                     variant="body2"
                >
                    Забыли пароль?
                </Link>
                <FormButton onClick={login}>Войти</FormButton>
            </form>
        </div>
    )
}

export default Form;