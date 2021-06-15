import React from 'react';
import {Typography} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { loginSaga } from '../../redux/actions';
import Form from './Form';

const LogIn = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const login = (data) => {
        dispatch(loginSaga(data));
        history.push('/organizations');
    }

    return (
        <>
            <Typography variant="h1" component="h2" gutterBottom>
                Привет
            </Typography>

            <Form handleLogin={login}/>
        </>
    )
}

export default LogIn;