import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavLink} from "react-router-dom";


const BackArrow: React.FC = () => {

    return (
        <NavLink to={'/'} style={{textDecoration: 'none'}}><ArrowBackIcon
            style={{color: 'black', cursor: 'pointer'}}
        /></NavLink>
    );
};

export default BackArrow;
