import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Avatar
 } from '@mui/material';
import colorConfigs from '../../configs/ColorConfig';
import SizeConfigs from '../../configs/SizeConfig';
import logo from '../../assets/img/other/png/logotipo.png';
import { AuthContext } from '../../contexts/AuthContext';

const Topbar = () => {
    const { user } = useContext(AuthContext);
    const userName = user?.username || 'Usuário'; 
    const userInitial = userName ? userName.charAt(0).toUpperCase() : ''; 
    console.log("nome de usuario => ",user)
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${SizeConfigs.sidebar.width})`,
                ml: SizeConfigs.sidebar.width,
                boxShadow: 'unset',
                backgroundColor: '#233049',
                color: colorConfigs.Topbar.color,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Restaurante Bom Garfo
                </Typography>
                <img src={logo} alt="logo" style={{ width: '10%', marginLeft: 'auto' }} />

                <Typography variant="body1" sx={{ color: '#fff', marginRight: 1 }}>
                    {userName}
                </Typography>
                <Avatar sx={{ backgroundColor: '#3f51b5' }} variant="rounded">
                    {userInitial}
                </Avatar>
            </Toolbar>
           
        </AppBar>
    );
};

export default Topbar;
