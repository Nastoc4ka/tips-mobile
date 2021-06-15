import React from 'react';
import { Link } from 'react-router-dom';

const OrganizationLink = ({name}) => {
    const route = name.split(' ').join('').toLowerCase();

    return (
        <Link to={`/${route}`} className='organizations__link'>{name}</Link>
    )
}

export default OrganizationLink;