import React, { useEffect } from 'react';
import {Typography} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizationsSaga } from '../../../redux/actions';
import OrganizationLink from './OrganizationLink';

const OrganizationsList = () => {
    const dispatch = useDispatch();
    const {organizations} = useSelector((state) => state.userReducer);

    const renderOrganizationsLinks = () => {
        return organizations.map(organization => (
            <OrganizationLink name={organization.name}/>
        ))
    }

    useEffect(() => {
        if (!organizations.length) dispatch(getOrganizationsSaga(6))
    }, []);

    return (
        <>
            <Typography variant="h1" component="h2" gutterBottom>
                Завидения
            </Typography>
            <ul className='block__content'>
                {renderOrganizationsLinks()}
            </ul>
        </>
    )
}

export default OrganizationsList;
