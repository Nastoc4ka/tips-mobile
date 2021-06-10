import React from 'react';
import { Logo } from '../../assets/icons';
import Form from './Form';

const LogIn = () => {
    return (
        <div className='login'>
            <div className='login__block login__logo'>
                <Logo />                
            </div>

            <div className='login__block'>
                <Form />
            </div>
        </div>
    )
}

export default LogIn;