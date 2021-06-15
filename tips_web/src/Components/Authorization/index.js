import React from 'react';
import { Route } from 'react-router';
import { Logo } from '../../assets/icons';
import OrganizationsList from './ChoosingOrganizations';
import LogIn from './LogIn';


const Auth = () => {
    return (
        <div className='login'>
            <div className='block login__logo'>
                <Logo />                
            </div>
            <div className='block'>
                <Route path='/organizations' component={OrganizationsList} />
                <Route path='/login' component={LogIn} />
            </div>
        </div>
    )
}

export default Auth