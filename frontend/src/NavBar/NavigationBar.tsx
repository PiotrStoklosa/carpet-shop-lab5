import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import logo from './logo.png';
import IconButton from '@mui/material/IconButton';
import {Badge, styled} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CartContext} from "../Body/Cart";
import {NavLink} from "react-router-dom";

export default function MenuAppBar() {

    const StyledIconButton = styled(IconButton)(({theme}) => ({
        '&.MuiIconButton-root': {
            color: theme.palette.common.black,
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    }));

    const {amount} = useContext(CartContext) || {};

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: '#3498DB'}}>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        <NavLink to={'/'} style={{textDecoration: 'none'}}>
                            <Avatar sx={{width: 60, height: 60}} alt="Logo" src={logo}/>
                        </NavLink>
                    </Typography>
                    <Box sx={{flexGrow: 2}}/>
                    <NavLink to={'/cart'} style={{textDecoration: 'none'}}>
                        <StyledIconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={amount} color="error">
                                <ShoppingCartIcon/>
                            </Badge>
                        </StyledIconButton>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
